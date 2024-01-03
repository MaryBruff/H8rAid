import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0ProviderWithNavigate } from '../Main/Main.js';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <Auth0ProviderWithNavigate
        domain="dev-nmwu6caxqykltiqw.us.auth0.com"
        clientId="vr4CpEnTxEiwRlO4UhrlT3HJ5Ko2Qd3i"
        authorizationParams={{
          redirect_uri: "http://localhost:3000/"
        }}
      >
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();