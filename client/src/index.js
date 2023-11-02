import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
fetch('https://random-exercise.onrender.com/api/exercise/');
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
