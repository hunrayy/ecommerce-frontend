import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import { CurrencyProvider } from './components/all_context/CurrencyContext.jsx'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '@fortawesome/fontawesome-free/css/all.min.css';

// import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <CurrencyProvider>
    <App />
    </CurrencyProvider>
  </BrowserRouter>
  </React.StrictMode>
)
