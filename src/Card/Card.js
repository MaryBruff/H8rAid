import "./Card.css"
import WikipediaPage from "../WikipediaPage/WikipediaPage"
import React, {useState} from 'react';
import DOMPurify from "dompurify";
import modifyRelativeUrls from "../hooks/modifyRelativeUrls"
// import star from ".../Media/star"


const Card = ({ title, snippet }) => {
    const [showPage,setShowPage] = useState(false)

  
    const sanitizedHtml = DOMPurify.sanitize(modifyRelativeUrls(snippet));

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
        <p
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sanitizedHtml)}}
        />
      {/* You can add more information or formatting here */}
      </div>
    </div>
  );
};

export default Card;