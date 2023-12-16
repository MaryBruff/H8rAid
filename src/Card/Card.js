import "./Card.css"
import React from 'react';

const Card = ({ title, body, reference }) => {
  return (
    <div className="card">
      <h2>Article Title: {title}</h2>
      <p>Controversy: {body}</p>
      <p>Reference: {reference}</p>
    </div>
  );
};

export default Card;