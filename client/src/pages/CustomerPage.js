import React, { useState, useEffect } from 'react'; // Import React and hooks
import DefaultLayout from '../components/DefaultLayout'; // Import layout component for consistent page structure
import { useDispatch } from 'react-redux'; // Import Redux dispatch hook for state management
import axios from 'axios'; // Import Axios for making HTTP requests
import { Table } from 'antd'; // Import Ant Design Table component

const CustomerPage = () => {
  const dispatch = useDispatch(); // Initialize dispatch function for Redux
  const [billsData, setBillsData] = useState([]); // State for storing bills data

  // Function to fetch all bills from the server
  const getAllBills = async () => {
    try {
      dispatch({
        type: 'SHOW_LOADING', // Dispatch action to show loading indicator
      });
      const { data } = await axios.get("/api/bills/get-bills"); // Make GET request to fetch bills data
      setBillsData(data); // Update state with fetched data
      dispatch({
        type: 'HIDE_LOADING', // Dispatch action to hide loading indicator
      });
    } 
    catch (error) {
      dispatch({
        type: 'HIDE_LOADING', // Dispatch action to hide loading indicator in case of error
      });
      console.log(error); // Log the error for debugging
    }
  };

  // useEffect hook to fetch bills data when the component mounts
  useEffect(() => {
    getAllBills(); // Call function to fetch bills data
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Table columns configuration
  const columns = [
    { title: 'Customer ID', dataIndex: '_id' }, // Column for customer ID
    { title: 'Customer Name', dataIndex: 'customerName' }, // Column for customer name
    { title: 'Contact Number', dataIndex: 'customerNumber' }, // Column for customer contact number
  ];

  return (
    <DefaultLayout>
      <h1>Customer Page</h1> {/* Page header */}
      <Table columns={columns} dataSource={billsData} bordered /> {/* Render table with bills data */}
    </DefaultLayout>
  );
};

export default CustomerPage; // Export the component