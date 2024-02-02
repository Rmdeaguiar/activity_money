import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes';
import { StoresProvider } from './stores';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoresProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </StoresProvider>
  </React.StrictMode>
);


