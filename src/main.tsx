import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { LanguageProvider } from './context/LanguageContext';
import { JobProvider } from './context/JobContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <JobProvider>
        <App />
      </JobProvider>
    </LanguageProvider>
  </React.StrictMode>
);
