import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <Auth0Provider
        domain="dev-nmwu6caxqykltiqw.us.auth0.com"
        clientId="vr4CpEnTxEiwRlO4UhrlT3HJ5Ko2Qd3i"
        authorizationParams={{
          redirect_uri: "http://localhost:3000/"
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();