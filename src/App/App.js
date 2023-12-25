import React from 'react';
import WikipediaSearch from '../Search/Search'; // Import your WikipediaSearch component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Render the WikipediaSearch component */}
        <WikipediaSearch />
      </header>
    </div>
  );
}

export default App;