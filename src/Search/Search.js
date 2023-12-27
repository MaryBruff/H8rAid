import React, { useState, useEffect } from 'react';
import Card from '../Card/Card'; // Update the path as per your file structure

function WikipediaSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      displaySearchResults(searchInput);
    }
  };

  const displaySearchResults = (searchTerm) => {
    let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchTerm}`;
  
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const filteredResults = data.query.search.filter(
          (item) =>
            item.title.toLowerCase().includes('abuse') ||
            item.title.toLowerCase().includes('allegation') ||
            item.title.toLowerCase().includes('drug') ||
            !containsHtmlTags(item.snippet.toLowerCase()) // Check if snippet contains HTML tags
        );
        // Clean up the snippet text by removing HTML tags and their content
        filteredResults.forEach((result) => {
          result.snippet = result.snippet.replace(/<[^>]*>?/gm, '');
        });
        setResults(filteredResults);
        console.log(filteredResults)
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const containsHtmlTags = (str) => {
    const htmlTagsRegex = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>|<([A-Za-z][A-Za-z0-9]*)\b[^\/]*\/>/;
    return htmlTagsRegex.test(str);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          autoComplete="off"
          placeholder="Search on Wikipedia"
        />
        <button type="submit">Search</button>
      </form>

      <div id="resultsList">
        {results.length > 0 && (
          <>
            <h2>Search Results for {searchInput}</h2>
            {results.map((item) => (
              <Card
                key={item.pageid}
                title={item.title}
                snippet={item.snippet}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default WikipediaSearch;