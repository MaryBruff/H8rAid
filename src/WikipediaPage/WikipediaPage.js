import React, { useState, useEffect } from 'react';
import "./WikipediaPage.css"
import PropTypes from "prop-types";

const WikipediaPage = ({ pageTitle }) => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${pageTitle}`;

  const extractAPIContents = (json) => {
    const { pages } = json.query;
    return Object.keys(pages).map((id) => pages[id].extract);
  };

const getContents = () => {
  setLoading(true);
  fetch(url)
  .then((resp) => {
    if (!resp.ok) {
      throw new Error('Network response was not ok');
    }
    return resp.json();
  })
  .then((json) => {
    const extractedContents = extractAPIContents(json);
    setContents(extractedContents);
  })
  .catch((err) => {
    setError(true);
    console.error('Error fetching Wikipedia page:', err);
  })
  .finally(() => {
    setLoading(false);
  });
};

useEffect(() => {
  getContents();
}, [pageTitle]);

return (
    <div className="article">
      <h1>{pageTitle}</h1>
      {loading && 'Loading...'}
      {error && 'An error occurred'}
      {contents.map((content, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: content }} />
      ))}
      <button className="saveButton">😡Save Controversy😡</button>
      <button className="favoriteButton">🤬Save as favorite controversy🤬</button>
    </div>
  );
};

export default WikipediaPage;

WikipediaPage.propTypes = {
    pageTitle: PropTypes.string.isRequired,
  };