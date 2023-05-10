import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './Components/Page';
import './App.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <div  style={{ backgroundColor: '#E8F0FE', minHeight: '100vh' , justifyContent:'center', alignItems:'center', paddingTop: '60px'}}>
      <Page/>
    </div>
    
  </React.StrictMode>
);
