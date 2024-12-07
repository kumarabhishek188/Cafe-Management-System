
import React, { useState, useEffect } from "react"; // Importing React and hooks
import DefaultLayout from "./../components/DefaultLayout"; // Importing layout component
import axios from "axios"; // Importing Axios for HTTP requests
import { useDispatch } from "react-redux"; // Importing dispatch function from Redux
import { Col, Row } from 'antd'; // Importing Ant Design grid components
import ItemList from "../components/ItemList"; // Importing the item list component

const Homepage = () => {
  // State variables
  const [itemsData, setItemsData] = useState([]); // Holds the list of items fetched from the server
  const [selectedCategory, setSelectedCategory] = useState("Mens Wear"); // Holds the currently selected category

  // List of categories with corresponding image URLs
  const categories = [
    {
      name: 'Beverages',
      imageUrl: 'https://thumbs.dreamstime.com/z/beverages-logo-icon-illustration-drink-glass-dessert-suitable-cafe-restaurant-325782251.jpg'
    },
    {
      name: 'Shakes',
      imageUrl: 'https://img.freepik.com/premium-vector/milk-shake-logo-minimalist-style-milkshake-silhouette-vector-suitable-milk-beverage-product-logos_254342-434.jpg'
    },
    {
      name: 'Confectionery',
      imageUrl: 'https://www.shutterstock.com/image-vector/baking-logo-vector-graphic-design-260nw-377874427.jpg'
    },
    {
      name: 'Snacks',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/005/013/755/non_2x/snack-logo-design-with-cassava-chips-icon-and-letter-s-initials-free-vector.jpg'
    }
  ];

  // Redux dispatch function
  const dispatch = useDispatch();

  // useEffect hook to fetch items when the component mounts
  useEffect(() => {//use effect ensures that the items get fetched only when the component is mounted
    
    const getAllItems = async () =>
    {
      try {
        dispatch({ type: 'SHOW_LOADING' }); // Dispatch action to show loading indicator
        const { data } = await axios.get("/api/items/get-item"); // Fetch items from the API
        setItemsData(data); // Update state with the fetched data
        dispatch({ type: 'HIDE_LOADING' }); // Dispatch action to hide loading indicator
      } 
      catch (error) {
        console.log(error); // Log error to console
      }
    };

    getAllItems(); // Call the function to fetch items
    
  }, [dispatch]); // Dependency array includes dispatch to avoid stale closures //so that lastest values are fetched

  return (
    //everything here will go as children paramter for content part of component used in defaultlayout
    <DefaultLayout> {/* Use DefaultLayout for consistent page layout*/} 

      <div className="d-flex">{/*this div is for item categories */}
        {/* Map through the categories to display category filters */}
        {categories.map(category => (
          <div
            key={category.name} // Unique key for each category
            className={`d-flex category ${selectedCategory === category.name && "category-active"}`} // Apply active class if category is selected
            onClick={() => setSelectedCategory(category.name)} // Set selected category on click
          >
            <h4>{category.name}</h4>
            <img src={category.imageUrl} alt={category.name} height="40" width="80" /> {/* Display category image */}
          </div>
        ))}
      </div>

      <Row>
        {/* Filter items by selected category and display them */}
        {itemsData.filter(item => item.category === selectedCategory).map(item => ( // Filter items based on selected category
            <Col xs={24} lg={6} md={12} sm={6} key={item.id}> {/* Grid layout for responsive design */}
              <ItemList item={item} /> {/* Render each item using ItemList component */}
            </Col>
          ))}
      </Row>
      
    </DefaultLayout>
  );
};

export default Homepage;
