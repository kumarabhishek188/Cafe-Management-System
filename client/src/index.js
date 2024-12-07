// Import the React library for creating user interfaces
import React from 'react';
// Import the ReactDOM library to interact with the DOM
import ReactDOM from 'react-dom/client';
// Import the Provider component from 'react-redux' to provide the Redux store to the React app
import { Provider } from 'react-redux';
// Import the CSS file for global styles
import './index.css';
// Import the main App component that will be rendered
import App from './App';
// Import the reportWebVitals function to measure app performance
import reportWebVitals from './reportWebVitals';
// Import the Redux store that holds the app's state
import store from './redux/store';

// Create a root element to render the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
// Wrap the App component with the Provider component to pass the Redux store down to the rest of the app
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Optionally measure and log performance metrics of the app
// You can pass a function to log the results or send them to an analytics endpoint
// For example: reportWebVitals(console.log)
// For more information, visit: https://bit.ly/CRA-vitals
reportWebVitals();
