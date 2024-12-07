// Initial state for the Redux store
const initialState = {
    loading: false, // Indicates if a loading operation is in progress
    cartItems: [],  // Array to hold items currently in the cart
};

// The rootReducer function to handle state changes based on actions
export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        // Action to show a loading spinner or indicator
        case 'SHOW_LOADING':
            return {
                ...state,          // Copy the current state
                loading: true,     // Set loading to true
            };
        
        // Action to hide the loading spinner or indicator
        case 'HIDE_LOADING':
            return {
                ...state,          // Copy the current state
                loading: false,    // Set loading to false
            };
        
        // Action to add an item to the cart
        case 'ADD_TO_CART':
            return {
                ...state,                        // Copy the current state
                cartItems: [...state.cartItems, action.payload], // Add new item to cartItems array
            };
        
        // Action to update an existing item in the cart
        case 'UPDATE_CART':
            return {
                ...state,  // Copy the current state
                cartItems: state.cartItems.map(item => 
                    // Check if the item ID matches the action payload
                    item._id === action.payload._id 
                        ? { ...item, quantity: action.payload.quantity } // Update the quantity
                        : item // Otherwise, keep the item unchanged
                ),
            };
        
        // Action to remove an item from the cart
        case 'DELETE_FROM_CART':
            return {
                ...state,  // Copy the current state
                cartItems: state.cartItems.filter(item => 
                    // Keep all items that do not match the ID in the action payload
                    item._id !== action.payload._id
                ),
            };
        
        case 'CLEAR_CART':
            return{
                ...state,
                cartItems:[]
            }

        // Default case if the action type does not match any of the above cases
        default:
            return state; // Return the current state unchanged
    }
};