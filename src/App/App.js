import React, { useState, useEffect } from 'react';
import WikipediaSearch from '../Search/Search';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='header-text'>H8rAid!</h1>
        <button className='login-button'>Login</button>
      </header>
      <Routes>
        <Route path='/main' element={<Navigate to='/' />} />
        <Route path='/' element={<WikipediaSearch />} />
      </Routes>
    </div>
  );
}

export default App;