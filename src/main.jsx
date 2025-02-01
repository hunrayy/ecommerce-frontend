// if (import.meta.env.VITE_APP_ENV == 'production') {
//   console.log = () => {};     // Disables all console.log statements
//   // console.error = () => {};   // Disables all console.error statements
//   console.group = () => {};   // Disables all console.group statements
//   // console.warn = () => {};    //diables all console.warn statements
// }

if (import.meta.env.VITE_APP_ENV === 'production') {
  // Create a no-op function
  const noop = () => {};

  // Replace all console methods with the no-op function
  Object.keys(console).forEach((method) => {
    console[method] = noop;
  });
}



import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import { CurrencyProvider } from './components/all_context/CurrencyContext.jsx'
import { NotificationProvider } from './components/all_context/NotificationContext.jsx'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-icons/icons'

// import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js"


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <NotificationProvider>
    <CurrencyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrencyProvider>
    </NotificationProvider>
  // </React.StrictMode>
)
