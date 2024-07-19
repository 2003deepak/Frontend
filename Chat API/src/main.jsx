import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <GoogleOAuthProvider clientId='996156470956-spbejmsjifiave7krn2okr6skggeqjs7.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
    
  </React.StrictMode>
)