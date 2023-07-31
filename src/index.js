import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/Page';
import './App.css'
import { Pages } from '@mui/icons-material';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <div  style={{ backgroundColor: '#E8F0FE', minHeight: '100vh' , justifyContent:'center', alignItems:'center'}}>
      <App/>
    </div>
    
  </React.StrictMode>
);
