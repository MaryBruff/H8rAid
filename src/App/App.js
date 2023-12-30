import React from 'react';
import WikipediaSearch from '../Search/Search';
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='header-text'>H8rAid!</h1>
        <button className='login-button'>Login</button>
      </header>
        <WikipediaSearch />
    </div>
  );
}

export default App;