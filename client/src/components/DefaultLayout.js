// Import necessary modules and components from React and other libraries
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import Spinner from "./Spinner"; // Custom component for displaying a loading spinner
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import "../styles/DefaultLayout.css"; // Custom CSS for styling of default layout

// Destructure Layout components from Ant Design
const { Header, Sider, Content } = Layout;//Comes by **default** in ant design component import for this component

// Define the DefaultLayout function containing components
const DefaultLayout = ({ children }) => 
{
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { cartItems, loading } = useSelector(state => state.rootReducer); // Access Redux state and extract cartitems, loading from rootReducer part of it

  //added because we changed component from class based to function based after importing it 
  const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse come by **default** for component

  // Function to toggle the sidebar collapse state
  const toggle = () => {//come by **default**
    setCollapsed(!collapsed); // Invert the collapsed state
  };

  // useEffect here is used to synchronize cart items with localStorage so that even if user refresh the page cartitems do not vary
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save cart items to localStorage whenever cartItems change
  }, [cartItems]/*useeffect get triggered whenever something in this array is changed */);

  return (
    //ANT DESIGN COMPONENT of layout(sidebar) begins here
    <Layout>
      {loading && <Spinner />} {/* Display the Spinner component if loading is true */}
      
      {/* SIDE BAR part of sidebar COMPONENT */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Sidebar (Sider) */}
        <div className="logo" onClick={()=>{navigate('/')}} style={{cursor:"pointer"}}>
          <h1 className="text-center text-light font-weight-bold mt-3">CAFE</h1>
        </div>
        
        <Menu
          theme="dark" // Menu theme color
          mode="inline" // Menu mode (inline for vertical menu)
          defaultSelectedKeys={[window.location.pathname]} // Highlight the current path in the menu
        >
          {/* Menu items */}
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem('auth'); // Remove authentication data from localStorage
              navigate('/login'); // Redirect to login page
              dispatch({type:"CLEAR_CART"})
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      
      {/* TOP BAR part of sidebar */}
      <Layout className="site-layout">
        {/* Main layout content */}
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {/* Header (Top bar) */}
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, // Display different icons based on collapsed state
            {
              className: "trigger",
              onClick: toggle, // Toggle sidebar collapse on click
            }
          )}
          
          {/* ADDED CART LOGO */}
          <div className="cart-item">
            <p>{cartItems.length}</p> {/* Display the number of items in the cart */}
          </div>
          <div className="cart-item-logo" 
            onClick={() => navigate('/cart')}>
            <ShoppingCartOutlined /> {/* Cart icon */}
          </div>
        </Header>
        
        {/* Display part of sidbar component */}
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px", // Margin around the content
            padding: 24, // Padding inside the content area
            minHeight: 280, // Minimum height of the content area
          }}
        >
          {children} {/* Render the child components (page content) */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;