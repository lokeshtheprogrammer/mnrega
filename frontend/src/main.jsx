import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import axios from 'axios';

// ✅ Set backend URL here (Replace with your Render / Railway backend URL)
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://YOUR-BACKEND-URL.com";

// ✅ Allow cookies if needed (optional)
// axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
