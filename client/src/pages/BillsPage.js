import React from 'react'; // Importing React
import DefaultLayout from '../components/DefaultLayout'; // Importing layout component
import { useEffect, useState, useRef } from "react"; // Importing React hooks
import { useDispatch } from "react-redux"; // Importing dispatch function from Redux
import axios from "axios"; // Importing Axios for HTTP requests
import { EyeOutlined } from '@ant-design/icons'; // Importing Ant Design icons
import { Modal, Button, Table } from 'antd'; // Importing Ant Design components
import { useReactToPrint } from 'react-to-print'; // Importing print functionality
import "../styles/InvoiceStyles.css"; // Importing custom styles

const BillsPage = () => {
  // Initialize dispatch function from Redux for dispatching actions
  const dispatch = useDispatch();
  
  // State variables
  const [billsData, setBillsData] = useState([]); // State to store bills data
  const componentRef = useRef(); // Ref to hold the component to be printed
  const [popupModal, setPopupModal] = useState(false); // State to manage modal visibility
  const [selectedBill, setSelectedBill] = useState(null); // State to store the selected bill for viewing

  // Function to fetch all bills from the API
  const getAllBills = async () => {
    try {
      dispatch({ type: 'SHOW_LOADING' }); // Dispatch action to show loading indicator
      const { data } = await axios.get("/api/bills/get-bills"); // Make API request to fetch bills
      setBillsData(data); // Update state with fetched bills data
      dispatch({ type: 'HIDE_LOADING' }); // Dispatch action to hide loading indicator
    } 
    catch (error) {
      dispatch({ type: 'HIDE_LOADING' }); // Dispatch action to hide loading indicator on error
      console.log(error); // Log error to console
    }
  };

  // useEffect hook to fetch bills data when the component mounts
  useEffect(() => {
    getAllBills(); // Call the function to fetch bills
  }, []); // Empty dependency array means this runs once on mount

  // Handle print functionality using react-to-print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current, // Reference to the component to be printed
  });

  // Columns configuration for the Ant Design Table component
  const columns = [
    { title: 'Customer ID', dataIndex: '_id' }, // Column for Customer ID
    { title: 'Customer Name', dataIndex: 'customerName' }, // Column for Customer Name
    { title: 'Contact Number', dataIndex: 'customerNumber' }, // Column for Customer Number
    { title: 'Date', dataIndex: 'date' }, // Column for Date
    { title: 'Sub Total', dataIndex: 'subTotal' }, // Column for Sub Total
    { title: 'Tax', dataIndex: 'tax' }, // Column for Tax
    { title: 'Total Amount', dataIndex: 'totalAmount' }, // Column for Total Amount
    { 
      title: 'Actions', // Column for Actions
      dataIndex: "_id",
      render: (id, record) => (//render represent entire data in the current row
        <div>
          <EyeOutlined 
            style={{ cursor: 'pointer' }} 
            onClick={() => {
              setSelectedBill(record); // Set selected bill when eye icon is clicked
              setPopupModal(true); // Show the modal
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout> {/* Use DefaultLayout for consistent page layout */}
      <div className="d-flex justify-content-between"> 
        <h1>Invoice List</h1> {/* Page title */}
      </div>
      
      <Table columns={columns} dataSource={billsData} bordered/> {/* Display the bills data in a table */}

      {/* Conditional rendering of the modal */}
      {popupModal && (
        <Modal 
          title="Invoice Details" 
          visible={popupModal} 
          onCancel={() => setPopupModal(false)} // Hide the modal on cancel
          footer={false} // Hide footer buttons
        >
          {/* Invoice details modal content */}
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="info">
                <h2>CAFE</h2>
                <p>Contact: 1234567890 | Bengaluru, Karnataka</p>
              </div>
            </center>
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name: <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No: <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date: <b>{selectedBill.date}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item"><h2>Item</h2></td>
                      <td className="Hours"><h2>Qty</h2></td>
                      <td className="Rate"><h2>Price</h2></td>
                      <td className="Rate"><h2>Total</h2></td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <tr className="service" key={item.name}>
                        <td className="tableitem">
                          <p className="itemtext">{item.name}</p>
                        </td>
                        <td className="tableitem">
                          <p className="itemtext">{item.quantity}</p>
                        </td>
                        <td className="tableitem">
                          <p className="itemtext">{item.price}</p>
                        </td>
                        <td className="tableitem">
                          <p className="itemtext">{item.quantity * item.price}</p>
                        </td>
                      </tr>
                    ))}
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate"><h2>Tax = </h2></td>
                      <td className="payment"><h2>₹{selectedBill.tax}</h2></td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate"><h2>Grand Total = </h2></td>
                      <td className="payment"><h2><b>₹{selectedBill.totalAmount}</b></h2></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 10% GST applied on total amount. 
                  Please note that this is a non-refundable amount. For any assistance, please email 
                  <b> help@mydomain.com</b>
                </p>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-end mt-3'>
            <Button type='primary' onClick={handlePrint}>Print</Button> {/* Button to trigger print */}
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default BillsPage;
