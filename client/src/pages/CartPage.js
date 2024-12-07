import React, { useState, useEffect } from "react"; // Import React and hooks
import DefaultLayout from "../components/DefaultLayout"; // Import layout component for consistent page structure
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks for state management
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons"; // Import Ant Design icons
import { Table, Button, Modal, message, Form, Input, Select } from "antd"; // Import Ant Design components
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import hook for navigation

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0); // State for subtotal of the cart
  const [billPopup, setBillPopup] = useState(false); // State for controlling visibility of the modal
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Hook for navigation
  const { cartItems } = useSelector((state) => state.rootReducer); // Access cart items from Redux store

  // Handle item quantity increment
  const handleIncreament = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 }, // Increment quantity and dispatch action
    });
  };

  // Handle item quantity decrement
  const handleDecreament = (record) => {
    if (record.quantity !== 1) {
      // Ensure quantity does not go below 1
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 }, // Decrement quantity and dispatch action
      });
    }
  };

  // Table columns definition
  const columns = [
    { title: "Name", dataIndex: "name" }, // Item name
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" /> // Display item image
      ),
    },
    { title: "Price", dataIndex: "price" }, // Item price
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncreament(record)} // Increment quantity on click
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecreament(record)} // Decrement quantity on click
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record, // Remove item from cart on click
            })
          }
        />
      ),
    },
  ];

  // Calculate subtotal whenever cartItems change
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp += item.price * item.quantity));
    setSubTotal(temp); // Update subtotal state
  }, [cartItems]); // Dependency array includes cartItems to recalculate subtotal when it changes

  // Handle form submission to generate a bill
  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,//value will include all details from popup form
        cartItems,
        subTotal,
        tax: Number(((subTotal / 100) * 10).toFixed(2)), // Calculate tax (10%)
        totalAmount:
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2)), // Calculate total amount
        userId: JSON.parse(localStorage.getItem("auth"))._id, // Get user ID from localStorage
      };
      await axios.post("/api/bills/add-bills", newObject); // Send data to server
      dispatch({type:"CLEAR_CART"})
      message.success("Bill Generated"); // Show success message
      navigate("/bills"); // Redirect to bills page
    } 
    catch (error) {
      message.error("Something went wrong"); // Show error message
      console.log(error); // Log error to console
    }
  };

  return (
    <DefaultLayout>
      <h1>Cart Page</h1>
      <Table columns={columns} dataSource={cartItems} bordered />{" "}
      {/* Display cart items in a table */}
      <div className="d-flex flex-column align-items-end">
        <hr />
        <h1>
          SUB TOTAL : ₹<b>{subTotal}</b> /-{" "}
        </h1>
        <Button type="primary" onClick={() => setBillPopup(true)}>
          Create Invoice {/* Open modal to create invoice */}
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={billPopup} // Modal visibility controlled by state
        onCancel={() => setBillPopup(false)} // Close modal on cancel
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          {/* Form to input customer details and generate bill */}
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerNumber" label="Contact Number">
            <Input />
          </Form.Item>
          <Form.Item name="paymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-it">
            <h5>
              Sub Total : ₹<b>{subTotal}</b>
            </h5>
            <h4>
              Tax : ₹<b>{((subTotal / 100) * 10).toFixed(2)}</b>
            </h4>
            <h1>
              Grand Total : ₹
              <b>
                {Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))}
              </b>
            </h1>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
