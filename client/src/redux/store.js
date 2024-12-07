// Import necessary functions and modules from Redux and other libraries
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Middleware for handling asynchronous actions
import { composeWithDevTools } from 'redux-devtools-extension'; // To use Redux DevTools for debugging
import { rootReducer } from './rootReducer'; // Import your combined reducer

// Combine reducers into a single reducer function
// Note: In this setup, you're wrapping `rootReducer` in another object. 
// Usually, you might have multiple reducers combined into one, but here it seems you only have one.
const finalReducer = combineReducers({//combines different reducers as a single reducer
    rootReducer
});

// Initial state for your Redux store
const initialState = {
    rootReducer: {
        loading: false,
        cartItems: localStorage.getItem("cartItems") ? //cause cartItems is used across various pages
        JSON.parse(localStorage.getItem("cartItems")) // Get cart items from localStorage if they exist
        : [], // Default to an empty array if no items are in localStorage
    },
};

// Middleware array
const middleware = [thunk]; // Add thunk middleware to handle asynchronous actions

// Create the Redux store with reducers, initial state, and middleware
const store = createStore(
    finalReducer, // The combined reducer
    initialState, // Initial state of the store
    composeWithDevTools(applyMiddleware(...middleware)) // Apply middleware and Redux DevTools extension
);

export default store; // Export the store for use in your application
