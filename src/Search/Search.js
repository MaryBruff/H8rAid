import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Card from '../Card/Card';
import './Search.css'
import useSearchResults from '../hooks/useSearchResults';

function WikipediaSearch({savedControversies, saveControversy}) {
  const [searchInput, setSearchInput] = useState('');
  const { initialResults, controversies, triggerSearch } = useSearchResults();
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      triggerSearch(searchInput);
    }
    setSearchInput('');
  };

  const { isAuthenticated } = useAuth0();


  return (
    <main>
      <div class='search-banner'>
      {isAuthenticated && (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            autoComplete="off"
            placeholder="Search on Wikipedia"
          />
          <button type="submit">Search</button>
        </form>
      )}
        {controversies[0] && <h2 id='resultName'>Controversies for {initialResults.title}</h2>}
      </div>
      <div>
        {controversies.length > 0 && (
          <section>
            <section id="resultsList">
              {controversies.map((item, i) => (
                <Card
                key={i}
                title={item.parse.title}
                snippet={item.parse.text["*"]}
                onSave={() => saveControversy(item.parse.text["*"])} // Save controversy function for Save button
                onSaveAsFavorite={() => saveControversy(item.parse.text["*"], true)} // Save as favorite controversy function for Save as Favorite button
              />
              ))}
            </section>
          </section>
        )}
      </div>
    </main>
  );
}

export default WikipediaSearch;