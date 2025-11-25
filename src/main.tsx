import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppContextProvider } from './context/AppContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root container missing');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
