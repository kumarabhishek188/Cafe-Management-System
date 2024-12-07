import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { message } from "antd";

const Login = () => {
  // Hook to dispatch actions to Redux store
  const dispatch = useDispatch();
  
  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (values) => 
  {
    try {
      // Dispatch an action to show loading spinner
      dispatch({ type: "SHOW_LOADING" });//Show spinner

      // Send a POST request to the login API endpoint
      const res = await axios.post("/api/users/login", values);

      // Check if the response data is valid and the user is verified
      if (res.data && res.data.verified) {
        // Hide the loading spinner
        dispatch({ type: "HIDE_LOADING" });//if data recieved is correct than hide spinner

        // Show success message
        message.success("User Login Successfully");

        // Store the user data in local storage
        localStorage.setItem("auth", JSON.stringify(res.data));

        // Navigate to the home page
        navigate("/");
      } 
      else {
        // Hide the loading spinner
        dispatch({ type: "HIDE_LOADING" });

        // Show error message for invalid credentials
        message.error("Invalid email or password. Please try again.");
      }
    } 
    catch (error) {
      // Hide the loading spinner in case of an error
      dispatch({ type: "HIDE_LOADING" });

      // Show error message for general errors
      message.error("Something went wrong. Please try again.");

      // Log the error for debugging
      console.log(error);
    }
  };

  // Effect to check if the user is already logged in
  useEffect(() => {
    // If authentication data exists in local storage, navigate to the home page
    if (localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]); // Dependency array: effect runs when 'navigate' changes

  return (
    <>
      <center>
        <div className="register">
          <div className="register-form">
            <h1>CAFE</h1>
            <h3>Login Page</h3>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item name="userId" label="User ID">
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input type="password" />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <p>
                  Not a user? Please
                  <Link to="/register"> Register Here!</Link>
                </p>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </center>
    </>
  );
};

export default Login;

