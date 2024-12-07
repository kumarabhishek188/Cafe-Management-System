//Client side routing is done here

// Importing the Ant Design CSS for styling
import 'antd/dist/antd.min.css';

// Importing components from 'react-router-dom' for routing
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing the page components
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BillsPage from './pages/BillsPage';
import CustomerPage from './pages/CustomerPage';

// Main App component
function App() {
  return (
    <>
      {/* BrowserRouter provides the routing context for the app */}
      <BrowserRouter>
        {/* Routes component defines all the route paths and their corresponding components */}
        <Routes>
          {/* Route for Homepage with protected access */}
          <Route path="/" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />
          {/* Route for ItemPage with protected access */}
          <Route path="/items" element={
            <ProtectedRoute><ItemPage /></ProtectedRoute>
          } />
          {/* Route for CartPage with protected access */}
          <Route path="/cart" element={
            <ProtectedRoute><CartPage /></ProtectedRoute>
          } />
          {/* Route for BillsPage with protected access */}
          <Route path="/bills" element={
            <ProtectedRoute><BillsPage /></ProtectedRoute>
          } />
          {/* Route for CustomerPage with protected access */}
          <Route path="/customers" element={
            <ProtectedRoute><CustomerPage /></ProtectedRoute>
          } />
          {/* Route for Login page (not protected) */}
          <Route path="/login" element={<Login />} />
          {/* Route for Register page (not protected) */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// Exporting the App component as default
export default App;

// Component to protect routes based on authentication
export function ProtectedRoute({children}){
  // Check if 'auth' is set in local storage (used for authentication check)
  if(localStorage.getItem('auth')){
    // If authenticated, render the child components
    return children;
  }
  else{
    // If not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }
}
