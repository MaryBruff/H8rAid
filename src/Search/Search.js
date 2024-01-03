import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import './Search.css'

function WikipediaSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [initialResults, setInitialResults] = useState({});
  const [page, setPage] = useState([]);
  const [controversies, setControversies] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      displaySearchResults(searchInput);
    }
    setSearchInput('');
  };
  
  async function displaySearchResults(searchTerm) {
    const url = 'https://en.wikipedia.org/w/api.php?';
    let params = {
      action: 'query',
      list: 'search',
      format: 'json',
      origin: '*',
      srlimit: 20,
      srsearch: searchTerm,
    };
  
  await fetch(url + new URLSearchParams(params).toString())
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
// Sets the state of the initial results to the first result of the search (i.e. Rush Limbaugh)
      setInitialResults(data.query.search[0]);
      navigate(`/article/${data.query.search[0].pageid}`);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// This useEffect will run when the initialResults state is updated to find the page from the initial result  
  useEffect(() => {
    if (initialResults.pageid) {
      const url = 'https://en.wikipedia.org/w/api.php?';
      let params = {
        action: 'parse',
        prop: 'sections',
        format: 'json',
        origin: '*',
        pageid: initialResults.pageid,
      };
      fetch(url + new URLSearchParams(params).toString())
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setPage(data.parse.sections);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [initialResults]);

// This useEffect will run when the page state is updated to find the controversies
  useEffect(() => {
    const words = ["Controversies", "Controversy", "Hoax", "Criticism", "Scandal", "Legal Issues", "Conspiracy", "Arrest", "Allegation","Allegations", "Dispute", "Abuse", "Criminal", "Banned", "Theft", "Imprisonment", "Censorship"];
// This function will find the sections that contain the words in the words array
    function findMatchingSections(page, words) {
      const lowerCaseWords = words.map(word => word.toLowerCase());
      return page.filter(section => {
        const titleLower = section.line.toLowerCase();
        return lowerCaseWords.some(word => titleLower.includes(word));
      });
    }
    const matchingSections = findMatchingSections(page, words);
 // This function will fetch the data for the matching sections
    if (matchingSections.length > 0) {
      const url = 'https://en.wikipedia.org/w/api.php?';
      const fetchPromises = matchingSections.map((section) => {
        let params = {
          action: 'parse',
          format: 'json',
          origin: '*',
          pageid: initialResults.pageid,
          section: section.index,
        };
        return fetch(url + new URLSearchParams(params).toString())
          .then((response) => response.ok ? response.json() : Promise.reject('Failed to load'))
          .catch((error) => console.error('Fetch error:', error));
      });
// This Promise.all will set the state of controversies to the results of the fetchPromises   
      Promise.all(fetchPromises)
        .then((results) => {
          setControversies(results.filter(result => result != null));
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [page, initialResults]);

  return (
    <main>
      <div class='search-banner'>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Search on Wikipedia"
          />
          <button type="submit">Search</button>
        </form>
        <h2 id='resultName'>Controversies for {initialResults.title}</h2>
      </div>
      <div>
        {controversies.length > 0 && (
          <section>
            
            <section id="resultsList">
              {controversies.map((item, i) => (
                <Card
                  key={i}
                  title={item.parse.title}
                  snippet={item.parse.text["*"]}
                />
              ))}
            </section>
          </section>
        )}
      </div>
    </main>
  );
}

export default WikipediaSearch;


// import React, { useState, useEffect } from 'react';
// import Card from '../Card/Card'; // Update the path as per your file structure

// function WikipediaSearch() {
//   const [searchInput, setSearchInput] = useState('');
//   const [results, setResults] = useState([]);
//   const [initialResults, setInitialResults] = useState([]);
//   const [page, setPage] = useState([]);
//   const [controversies, setControversies] = useState([]);

//   const handleInputChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (searchInput.trim() !== '') {
//       displaySearchResults(searchInput);
//     }
//     setSearchInput('');
//   };

//   async function displaySearchResults(searchTerm){
//     // let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchTerm}`;
//     const url = 'https://en.wikipedia.org/w/api.php?'
//     let params = {
//       action: 'query',
//       list: 'search',
//       format: 'json',
//       origin: '*',
//       srlimit: 20,
//       srsearch: searchTerm,
//     };

//     await fetch(url + new URLSearchParams(params).toString())
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
// // Sets the state of the initial results to the first result of the search (i.e. Rush Limbaugh)
//         setInitialResults(data.query.search[0])
//       })
//       .catch((error) => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   };

// // This useEffect will run when the initialResults state is updated to find the page from the initial result  
//   useEffect(() => {
    
//       const url = 'https://en.wikipedia.org/w/api.php?'
//       let params = {
//         action: 'parse',
//         prop: 'sections',
//         format: 'json',
//         origin: '*',
//         pageid: initialResults.pageid,
//       };
//       fetch(url + new URLSearchParams(params).toString())
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setPage(data.parse.sections)
//         })
//         .catch((error) => {
//           console.error('There was a problem with the fetch operation:', error);
//         });
    
//   }, [initialResults]);

// // This useEffect will run when the page state is updated to find the controversies
//   useEffect(() => {
//     const words = ["Controversies", "Controversy", "Hoax", "Criticism", "Scandal", "Legal Issues", "Conspiracy"];

// // This function will find the sections that contain the words in the words array
//     function findMatchingSections(page, words) {
//         const lowerCaseWords = words.map(word => word.toLowerCase());

//         return page.filter(section => {
//             const titleLower = section.line.toLowerCase();
//             return lowerCaseWords.some(word => titleLower.includes(word));
//         });
//     }

//     const matchingSections = findMatchingSections(page, words);

// // This function will fetch the data for the matching sections
//     if (matchingSections.length > 0) {
//       const url = 'https://en.wikipedia.org/w/api.php?';
//       const fetchPromises = matchingSections.map((section) => {
//         let params = {
//           action: 'parse',
//           format: 'json',
//           origin: '*',
//           pageid: initialResults.pageid,
//           section: section.index,
//         };
//         return fetch(url + new URLSearchParams(params).toString())
//           .then((response) => response.ok ? response.json() : Promise.reject('Failed to load'))
//           .catch((error) => console.error('Fetch error:', error));
//       });
      
// // This Promise.all will set the state of controversies to the results of the fetchPromises   
//       Promise.all(fetchPromises)
//         .then((results) => {
//           setControversies(results.filter(result => result != null));
//         })
//         .catch((error) => {
//           console.error('There was a problem with the fetch operation:', error);
//         });
//     } 
//   }, [page]);

//   console.log("controversies: ", controversies);


//   return (
//     <div>
//       <form onSubmit={handleFormSubmit}>
//         <input
//           type="text"
//           value={searchInput}
//           onChange={handleInputChange}
//           autoComplete="off"
//           placeholder="Search on Wikipedia"
//         />
//         <button type="submit">Search</button>
//       </form>

//       <div id="resultsList">
//         {controversies.length > 0 && (
//           <>
//             <h2>Controversies for {initialResults.title}</h2>
//             {controversies.map((item, i) => (
//               <Card
//                 key={i}
//                 title={item.parse.title}
//                 snippet={item.parse.text["*"]}
//               />
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default WikipediaSearch;