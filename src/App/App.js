import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WikipediaSearch from '../Search/Search.js';
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton, NavBarButtons } from '../Main/Main.js';
import './App.css';

function App() {
  const { isLoading } = useAuth0();

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
    </div>
  );
}

export default App;