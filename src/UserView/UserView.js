import React, { useState } from 'react';

const Profile = ({ savedControversies }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  const handleShowAll = () => {
    setShowFavorites(false);
    console.log(savedControversies)
  };

  const handleShowFavorites = () => {
    setShowFavorites(true);
  };

  const filteredControversies = showFavorites
    ? savedControversies.filter((controversy) => controversy.isFavorite)
    : savedControversies;

  return (
    <div className="profile">
      <div className="filter-buttons">
        <button onClick={handleShowAll}>Show All</button>
        <button onClick={handleShowFavorites}>Show Favorites</button>
      </div>
      <h2>Saved Controversies</h2>
      <div>
        {filteredControversies.map((controversy, index) => (
          <div key={index}>
            <p>{controversy.content}</p>
            <p>{controversy.isFavorite ? 'Favorite' : 'Not Favorite'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
