// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { Auth0ProviderWithNavigate } from './Main/Main.js';
// import './index.css';
// import App from './App/App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     <BrowserRouter> 
//       <Auth0ProviderWithNavigate
//         domain="dev-nmwu6caxqykltiqw.us.auth0.com"
//         clientId="vr4CpEnTxEiwRlO4UhrlT3HJ5Ko2Qd3i"
//         authorizationParams={{
//           redirect_uri: "http://localhost:3000/"
//         }}
//       >
//         <App />
//       </Auth0ProviderWithNavigate>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// reportWebVitals();

// import React, { useEffect, useState } from 'react';
// import { Routes, Route, useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
// import WikipediaSearch from '../Search/Search.js';
// import { useAuth0 } from "@auth0/auth0-react";
// import { LoginButton, LogoutButton, NavBarButtons } from '../Main/Main.js';
// import './App.css';
// import Card from '../Card/Card.js';
// import useSearchResults from '../hooks/useSearchResults.js';
// import Profile from '../UserView/UserView.js';


// function App() {
//   const { isLoading, isAuthenticated } = useAuth0();
//   const navigate = useNavigate()
//   const location = useLocation()
//   const showRandomControversy = location.pathname !== '/profile'; 
//   const [savedControversies, setSavedControversies] = useState([]);

  
//   const randomSearchInputs = ['4chan', 'Titan (Submersible)', 'Billy Mitchell (gamer)', 'You Showed Me', 'Ezra Miller', 'Russel Brand', 'Bernie Madoff', 'Amy Winehouse']
//   const { initialResults, controversies, triggerSearch  } = useSearchResults();
  
//   const randomSearch = () => {
//     const randomIndex = Math.floor(Math.random() * randomSearchInputs.length);
//     triggerSearch(randomSearchInputs[randomIndex]);
//   }
  
//   // COMMENT BACK IN L8R
//   // useEffect(() => {
//   //   randomSearch();
//   // }, []);

//   if (isLoading) {
//     return (
//       <div className="page-loading">
//         <p>One moment please</p>
//       </div>
//     );
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//       <Link to="/" className="logo-link"> {/* Wrap the H8rAid logo with Link */}
//           <h1 className='header-text'>H8rAid!</h1>
//       </Link>
//       <NavBarButtons />
//         {isAuthenticated && <button onClick={() => navigate("/profile")}>Profile</button>}
//       </header>
//       <Routes>
//         <Route path='/' element={<WikipediaSearch savedControversies={savedControversies}/>} />
//         <Route path='/main' element={<Navigate to='/' savedControversies={savedControversies}/>} />
//         <Route path='/profile' element={<Profile savedControversies={savedControversies} />} />
//         <Route path="article/:id" element={<WikipediaSearch />} />
//       </Routes>
//       {showRandomControversy && ( // Render Random Controversy section conditionally

//       <footer className='footer-card'>
//         <h2 className='footer-text'>Random Controversy</h2>
//         {controversies[0] && <h2 id='resultName'>{initialResults.title}</h2>}
//         {controversies.map((item, i) => (
//           <Card
//             key={i}
//             title={item.parse.title}
//             snippet={item.parse.text["*"]}
//           />
//         ))}
//       </footer>
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";
// import Card from '../Card/Card';
// import './Search.css'
// import useSearchResults from '../hooks/useSearchResults';

// function WikipediaSearch() {
//   const [searchInput, setSearchInput] = useState('');
//   const { initialResults, controversies, triggerSearch } = useSearchResults();
//   const navigate = useNavigate();
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (searchInput.trim() !== '') {
//       triggerSearch(searchInput);
//     }
//     setSearchInput('');
//   };

//   const [savedControversies, setSavedControversies] = useState([])
//   const { isAuthenticated } = useAuth0();

//   const saveControversy = (snippet, isFavorite = false) => {
//     const controversyObject = {
//       isFavorite: isFavorite,
//       content: snippet,
//     };
//     setSavedControversies([...savedControversies, controversyObject]);
//     console.log(savedControversies)
//   };

//   return (
//     <main>
//       <div class='search-banner'>
//       {isAuthenticated && (
//         <form onSubmit={handleFormSubmit}>
//           <input
//             type="text"
//             value={searchInput}
//             onChange={e => setSearchInput(e.target.value)}
//             autoComplete="off"
//             placeholder="Search on Wikipedia"
//           />
//           <button type="submit">Search</button>
//         </form>
//       )}
//         {controversies[0] && <h2 id='resultName'>Controversies for {initialResults.title}</h2>}
//       </div>
//       <div>
//         {controversies.length > 0 && (
//           <section>
//             <section id="resultsList">
//               {controversies.map((item, i) => (
//                 <Card
//                 key={i}
//                 title={item.parse.title}
//                 snippet={item.parse.text["*"]}
//                 onSave={() => saveControversy(item.parse.text["*"])} // Save controversy function for Save button
//                 onSaveAsFavorite={() => saveControversy(item.parse.text["*"], true)} // Save as favorite controversy function for Save as Favorite button
//               />
//               ))}
//             </section>
//           </section>
//         )}
//       </div>
//     </main>
//   );
// }

// export default WikipediaSearch;

// import React, { useState } from 'react';
// import DOMPurify from 'dompurify';
// import './Card.css';
// import modifyRelativeUrls from '../hooks/modifyRelativeUrls';

// const Card = ({ snippet, onSave, onSaveAsFavorite }) => {
//   const [showFullContent, setShowFullContent] = useState(false);

//   const sanitizedSnippet = DOMPurify.sanitize(modifyRelativeUrls(snippet));

//   const snippetToShow = showFullContent ? sanitizedSnippet : sanitizedSnippet.slice(0, 2500) + '...';

//   const handleTitleClick = () => {
//     setShowFullContent(!showFullContent);
//   };
//   return (
//     <div className="card">
//       <article className="card-content" onClick={handleTitleClick}>
//         <p dangerouslySetInnerHTML={{ __html: snippetToShow }} />
//         <button className="saveButton" onClick={onSave}>😡Save Controversy😡</button>
//         <button className="favoriteButton" onClick={onSaveAsFavorite}>🤬Save as favorite controversy🤬</button>
//       </article>
//     </div>
//   );
// };

// export default Card;

// import React from "react";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

// export const Auth0ProviderWithNavigate = ({ children }) => {
//   const navigate = useNavigate();

//   const domain = process.env.REACT_APP_AUTH0_DOMAIN;
//   const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
//   const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

//   const onRedirectCallback = (appState) => {
//     navigate(appState?.returnTo || window.location.pathname);
//   };

//   if (!(domain && clientId && redirectUri)) {
//     return null;
//   }

//   return (
//     <Auth0Provider
//       domain={domain}
//       clientId={clientId}
//       authorizationParams={{
//         redirect_uri: redirectUri,
//       }}
//       onRedirectCallback={onRedirectCallback}
//     >
//       {children}
//     </Auth0Provider>
//   );
// };

// export const LoginButton = () => {
//   const { loginWithRedirect } = useAuth0();

//   const handleLogin = async () => {
//     await loginWithRedirect({
//       appState: {
//         returnTo: "/main",
//       },
//     });
//   };

//   return (
//     <button className="button__login" onClick={handleLogin}>
//       Log In
//     </button>
//   );
// };

// export const LogoutButton = () => {
//   const { logout } = useAuth0();

//   const handleLogout = () => {
//     logout({
//       logoutParams: {
//         returnTo: window.location.origin,
//       },
//     });
//   };

//   return (
//     <button className="button__logout" onClick={handleLogout}>
//       Log Out
//     </button>
//   );
// };

// export const NavBarButtons = () => {
//   const { isAuthenticated } = useAuth0();

//   return (
//     <div className="nav-bar__buttons">
//       {!isAuthenticated && (
//         <>
//           <LoginButton />
//         </>
//       )}
//       {isAuthenticated && (
//         <>
//           <LogoutButton />
//         </>
//       )}
//     </div>
//   );
// };

// import React, { useState } from 'react';

// const Profile = ({ savedControversies }) => {
//   const [showFavorites, setShowFavorites] = useState(false);

//   const handleShowAll = () => {
//     setShowFavorites(false);
//     console.log(savedControversies)
//   };

//   const handleShowFavorites = () => {
//     setShowFavorites(true);
//   };

//   const filteredControversies = showFavorites
//     ? savedControversies.filter((controversy) => controversy.isFavorite)
//     : savedControversies;

//   return (
//     <div className="profile">
//       <div className="filter-buttons">
//         <button onClick={handleShowAll}>Show All</button>
//         <button onClick={handleShowFavorites}>Show Favorites</button>
//       </div>
//       <h2>Saved Controversies</h2>
//       <div>
//         {filteredControversies.map((controversy, index) => (
//           <div key={index}>
//             <p>{controversy.content}</p>
//             <p>{controversy.isFavorite ? 'Favorite' : 'Not Favorite'}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Profile;
