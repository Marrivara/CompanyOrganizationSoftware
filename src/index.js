import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './Pages/Page';
import './App.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <div  style={{ backgroundColor: '#E8F0FE', minHeight: '100vh' , justifyContent:'center', alignItems:'center'}}>
      <Page/>
    </div>
    
  </React.StrictMode>
);
