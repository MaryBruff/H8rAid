import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import WikipediaSearch from '../Search/Search.js';
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton, NavBarButtons } from '../Main/Main.js';
import './App.css';
import Card from '../Card/Card.js';
import useSearchResults from '../hooks/useSearchResults.js';
import Profile from '../UserView/UserView.js';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate()
  const location = useLocation()
  const showRandomControversy = location.pathname !== '/profile'; 
  const [savedControversies, setSavedControversies] = useState([]);

  
  const randomSearchInputs = ['4chan', 'Titan (Submersible)', 'Billy Mitchell (gamer)', 'You Showed Me', 'Ezra Miller', 'Russell Brand', 'Bernie Madoff', 'Amy Winehouse']
  const { initialResults, controversies, triggerSearch  } = useSearchResults();
  
  const randomSearch = () => {
    const randomIndex = Math.floor(Math.random() * randomSearchInputs.length);
    triggerSearch(randomSearchInputs[randomIndex]);
  }

  const saveControversy = (snippetToShow, isFavorite = false) => {
    const controversyObject = {
      isFavorite: isFavorite,
      content: snippetToShow,
    };
    setSavedControversies([...savedControversies, controversyObject]);
    console.log(savedControversies)
  };
  
  // COMMENT BACK IN L8R
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
      <Link to="/" className="logo-link"> 
        <h1 className='header-text'>H8rAid!</h1>
      </Link>
      {isAuthenticated && <button onClick={() => navigate("/profile")}>Profile</button>}
      <NavBarButtons />
      </header>
      <Routes>
        <Route path='/' element={<WikipediaSearch savedControversies={savedControversies} saveControversy={saveControversy} />}/>
        <Route path='/main' element={<Navigate to='/' />} />
        <Route path='/profile' element={<Profile savedControversies={savedControversies} />}/>
        <Route path="article/:id" element={<WikipediaSearch />} />
      </Routes>
      {showRandomControversy && ( 
      <section className='random-view'>
        <h2 className='random-headline'>Random Controversy</h2>
        {controversies[0] && <h2 className='result-name'>{initialResults.title}</h2>}
        <section className='results-list'>
        {controversies.map((item, i) => (
          <Card
            key={i}
            title={item.parse.title}
            snippet={item.parse.text["*"]}
          />
        ))}
        </section>
      </section>
      )}
    </div>
  );
};

export default App;