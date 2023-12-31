import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';

function WikipediaSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [initialResults, setInitialResults] = useState([]);
  const [page, setPage] = useState([]);
  const [controversies, setControversies] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      displaySearchResults(searchInput);
    }
    setSearchInput('');
  };

  async function displaySearchResults(searchTerm) {
    const url = 'https://en.wikipedia.org/w/api.php?';
    let params = {
      action: 'query',
      list: 'search',
      format: 'json',
      origin: '*',
      srlimit: 20,
      srsearch: searchTerm,
    };

    try {
      const response = await fetch(url + new URLSearchParams(params).toString());
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setInitialResults(data.query.search[0]);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (initialResults.pageid) {
        const url = 'https://en.wikipedia.org/w/api.php?';
        let params = {
          action: 'parse',
          prop: 'sections',
          format: 'json',
          origin: '*',
          pageid: initialResults.pageid,
        };

        try {
          const response = await fetch(url + new URLSearchParams(params).toString());
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPage(data.parse.sections);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }
    };

    fetchData();
  }, [initialResults.pageid]);

  useEffect(() => {
    const words = ["Controversies", "Controversy", "Hoax", "Criticism", "Scandal", "Legal Issues", "Conspiracy"];

    function findMatchingSections(page, words) {
      const lowerCaseWords = words.map(word => word.toLowerCase());
      return page.filter(section => {
        const titleLower = section.line.toLowerCase();
        return lowerCaseWords.some(word => titleLower.includes(word));
      });
    }

    const matchingSections = findMatchingSections(page, words);

    if (matchingSections.length > 0 && initialResults.pageid) {
      const url = 'https://en.wikipedia.org/w/api.php?';
      const fetchPromises = matchingSections.map((section) => {
        let params = {
          action: 'parse',
          format: 'json',
          origin: '*',
          pageid: initialResults.pageid,
          section: section.index,
        };
        return fetch(url + new URLSearchParams(params).toString())
          .then((response) => response.ok ? response.json() : Promise.reject('Failed to load'))
          .catch((error) => console.error('Fetch error:', error));
      });

      Promise.all(fetchPromises)
        .then((results) => {
          setControversies(results.filter(result => result != null));
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [page, initialResults.pageid]);

  useEffect(() => {
    if (initialResults.title) {
      navigate(`/contacts/${initialResults.pageid}`);
    }
  }, [navigate, initialResults]);

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
        {controversies.length > 0 && (
          <>
            <h2>Controversies for {initialResults.title}</h2>
            {controversies.map((item, i) => (
              <Card
                key={i}
                title={item.parse.title}
                snippet={item.parse.text["*"]}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default WikipediaSearch;
