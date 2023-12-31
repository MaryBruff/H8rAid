import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WikipediaSearch from '../Search/Search.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='header-text'>H8rAid!</h1>
        <button className='login-button'>Login</button>
      </header>
      <Routes>
        <Route path='/' element={<WikipediaSearch />} />
        <Route path='/main' element={<Navigate to='/' />} />
        <Route path="/contacts/:id" element={<WikipediaSearch />} />
      </Routes>
    </div>
  );
}

export default App;
