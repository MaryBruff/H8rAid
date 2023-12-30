import React, { useState, useEffect } from 'react';
import WikipediaSearch from '../Search/Search';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  // const [initialLoad, setInitialLoad] = useState(false);

  // useEffect(() => {
  //   const pageLoad = () => {
  //     setInitialLoad(true);
  //   };

  //   window.addEventListener('load', pageLoad);

  //   return () => {
  //     window.removeEventListener('load', pageLoad);
  //   };
  // }, []);

  // if (!initialLoad) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='header-text'>H8rAid!</h1>
        <button className='login-button'>Login</button>
      </header>
      <Routes>
        <Route path='/' element={<Navigate to='/main' />} />
        <Route path='/main' element={<WikipediaSearch />} />
      </Routes>
    </div>
  );
}

export default App;