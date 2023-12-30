import React, { useState } from 'react';
import Card from '../Card/Card';

const ControversyDisplay = ({ initialResults, controversies }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const handleShowFavorites = () => {
    setShowFavorites(true);
  };

  const handleShowAllControversies = () => {
    setShowFavorites(false);
  };

  return (
    <div>
      {!showFavorites ? (
        <button onClick={handleShowFavorites}>Show me only my favorites</button>
      ) : (
        <button onClick={handleShowAllControversies}>Show me all of my controversies again</button>
      )}

      <div id="resultsList">
        {showFavorites && controversies.length > 0 ? (
          <>
            <h2>Favorite Controversies for {initialResults.title}</h2>
            {controversies.map((item, i) => (
              <Card
                key={i}
                title={item.parse.title}
                snippet={item.parse.text['*']}
              />
            ))}
          </>
        ) : (
          controversies.length > 0 && (
            <>
              <h2>Controversies for {initialResults.title}</h2>
              {controversies.map((item, i) => (
                <Card
                  key={i}
                  title={item.parse.title}
                  snippet={item.parse.text['*']}
                />
              ))}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default ControversyDisplay;





