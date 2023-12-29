import DOMPurify from "dompurify";

const modifyRelativeUrls = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const links = doc.querySelectorAll('a[href^="/wiki/"]');


    links.forEach((link) => {
      const href = link.getAttribute("href");
      link.setAttribute("href", `https://en.wikipedia.org${href}`);
    
    });
    return doc.body.innerHTML; 
  };


  export default modifyRelativeUrls;