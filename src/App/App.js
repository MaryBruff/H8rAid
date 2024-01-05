import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WikipediaSearch from '../Search/Search.js';
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton, NavBarButtons } from '../Main/Main.js';
import './App.css';
import Card from '../Card/Card.js';
import useSearchResults from '../hooks/useSearchResults.js';

function App() {
  const { isLoading } = useAuth0();
  const randomSearchInputs = ['4chan', 'Titan (Submersible)', 'Billy Mitchell (gamer)', 'You Showed Me', 'Ezra Miller', 'Russell Brand', 'Bernie Madoff', 'Amy Winehouse'];
  const { initialResults, controversies, triggerSearch  } = useSearchResults();
  
  const randomSearch = () => {
    const randomIndex = Math.floor(Math.random() * randomSearchInputs.length);
    triggerSearch(randomSearchInputs[randomIndex]);
  }

  useEffect(() => {
    randomSearch();
  }, []);

  if (isLoading) {
    return (
      <div className="page-loading">
        <p>One moment please</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='header-text'>H8rAid!</h1>
        <NavBarButtons />
      </header>
      <Routes>
        <Route path='/' element={<WikipediaSearch />} />
        <Route path='/main' element={<Navigate to='/' />} />
        <Route path="article/:id" element={<WikipediaSearch />} />
      </Routes>
      <section className='random-view'>
        <h2 className='random-headline'>Random Controversy</h2>
        {controversies[0] && <h2 className='result-name'>{initialResults.title}</h2>}
        <section id='randomList'>
          {controversies.map((item, i) => (
            <Card
              key={i}
              title={item.parse.title}
              snippet={item.parse.text["*"]}
            />
          ))}
        </section>
      </section>
    </div>
  );
};

export default App;