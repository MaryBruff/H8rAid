import "./Card.css"
import WikipediaPage from "../WikipediaPage/WikipediaPage"
import React, {useState} from 'react';
// import star from ".../Media/star"

const Card = ({ title, snippet }) => {
    const [showPage,setShowPage] = useState(false)

    const handleTitleClick = () =>{
        setShowPage(true)
    }

    if (showPage) {
        return <WikipediaPage pageTitle={title} />
    }

  return (
    <div className="card">
        {/* <img src={star} alt="Star Icon" className="star-icon"/> */}
        <div className="card-content">
      <h2 onClick={handleTitleClick}> Article Title: {title}</h2>
      <p>Snippet: {snippet}</p>
      {/* You can add more information or formatting here */}
      </div>
    </div>
  );
};

export default Card;