import "./Card.css"
import React from 'react';

const Card = ({ title, snippet }) => {
  return (
    <div className="card">
      <h2>Article Title: {title}</h2>
      <p>Snippet: {snippet}</p>
      {/* You can add more information or formatting here */}
    </div>
  );
};

export default Card;