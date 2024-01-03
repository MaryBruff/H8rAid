// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// export const CallbackPage = () => {
//   return (

//     <div className="page-layout">
//<header className="App-header">
// {<h1 className='header-text'>H8rAid!</h1>
// <button className='login-button'>Login</button>
// </header>}
    // <div className="page-layout__content" />
//     </div>
//   );
// };


// const LoginButton = () => {
//   const { loginWithRedirect } = useAuth0();

//   return <button onClick={() => loginWithRedirect()}>Log In</button>;
// };

// const LogoutButton = () => {
//   const { logout } = useAuth0();

//   return (
//     <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
//       Log Out
//     </button>
//   );
// };

// const Profile = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0();

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }

//   return (
//     isAuthenticated && (
//       <div>
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//       </div>
//     )
//   );
// };

// export default { CallbackPage, LoginButton, LogoutButton, Profile };