// Import necessary modules and components
import { useDispatch } from 'react-redux';
import React from 'react';
import { Button, Card } from 'antd';

// Define the ItemList component
const ItemList = ({ item }) => 
{

  const dispatch = useDispatch(); // Hook to access the Redux dispatch function

  // Handler function to add the item to the cart
  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART', // Action type for adding item to cart
      payload: { ...item, quantity: 1 } // Payload with item details and initial quantity of 1
    });
  };

  return (
    <Card
      style={{ width: 240, marginBottom: 20 }} // Card styling with width and bottom margin
      cover={<img alt={item.name} src={item.image} style={{ height: 200 }} />} // Cover image for the card
    >
      <div className='product-info'>
        <div>
          <h3>{item.name}</h3> {/* Display item name */}
          <span>Price: ₹ {item.price} </span> {/* Display item price */}
        </div>
        <div className='item-button'>
          <Button onClick={handleAddToCart}>Add to cart</Button> {/* Button to add item to the cart */}
        </div>
      </div>
    </Card>
  );
  
};

export default ItemList;