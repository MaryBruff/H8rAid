import './App.css';

import { savedCont } from "../savedIdeasvar";
import Card from "../Card/Card";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {savedCont.map((item, index) => (
          <Card
            key={index}
            title={item.articleTitle}
            body={item.controversy}
            reference={item.reference}
          />
        ))}
      </header>
    </div>
  );
}

export default App;