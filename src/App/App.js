import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WikipediaSearch from '../Search/Search.js';
import './App.css';
import Card from '../Card/Card.js';
import useSearchResults from '../hooks/useSearchResults.js';


function App() {
  const randomSearchInputs = ['4chan', 'Titan (Submersible)', 'Billy Mitchell (gamer)', 'You Showed Me', 'Ezra Miller', 'Russel Brand', 'Bernie Madoff', 'Amy Winehouse']
  const { triggerSearch, controversies, initialResults } = useSearchResults();

  const randomSearch = () => {
    const randomIndex = Math.floor(Math.random() * randomSearchInputs.length);
    triggerSearch(randomSearchInputs[randomIndex]);
  }

  // COMMENT BACK IN L8R
  // useEffect(() => {
  //   randomSearch();
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='header-text'>H8rAid!</h1>
        <button className='login-button'>Login</button>
      </header>
      <Routes>
        <Route path='/' element={<WikipediaSearch />} />
        {/* <Route path='/main' element={<Navigate to='/' />} /> */}
        <Route path="article/:id" element={<WikipediaSearch />} />
      </Routes>
      <footer className='footer-card'>
        <h2 className='footer-text'>Random Controversy</h2>
        {controversies[0] && <h2 id='resultName'>{initialResults.title}</h2>}
        {controversies.map((item, i) => (
          <Card
            key={i}
            title={item.parse.title}
            snippet={item.parse.text["*"]}
          />
        ))}
      </footer>
    </div>
  );
}

export default App;
