import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Search() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { wikiID } = useParams();
  const [pageContent, setPageContent] = useState(null);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      navigate(`/contacts/${searchInput}`);
    }
    setSearchInput('');
  };

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?pageid=${wikiID}&format=json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPageContent(data);
      } catch (error) {
        console.error('There was a problem with fetching the page content:', error);
      }
    };

    if (wikiID) {
      fetchPageContent();
    }
  }, [wikiID]);

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
      <div>
        {/* Render page content using the 'pageContent' state */}
      </div>
    </div>
  );
}

export default Search;