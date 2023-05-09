import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './Components/Page';
import './App.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <div  style={{  minHeight: '100vh' }}>
      <Page/>
    </div>
    
  </React.StrictMode>
);
