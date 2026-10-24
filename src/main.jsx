import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Preferencias } from './i18n/Preferencias.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Preferencias>
      <App />
    </Preferencias>
  </StrictMode>
);
