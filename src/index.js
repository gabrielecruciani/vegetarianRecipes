import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'typeface-roboto';
import { ThemeProvider } from './components/ThemeContext'; 
import './Index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);