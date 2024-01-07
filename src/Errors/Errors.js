import React from 'react';

const errorMessage = ({ errorMessage }) => {
  return (
    <div className="error-page">
      <h2>Error Encountered</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

export default errorMessage;