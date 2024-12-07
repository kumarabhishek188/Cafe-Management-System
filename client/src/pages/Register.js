import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

const Register = () => {
  // Hook to dispatch actions to Redux store
  const dispatch = useDispatch();
  
  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (values) => 
  {
    try {
      // Dispatch an action to show loading spinner
      dispatch({ type: 'SHOW_LOADING' });

      // Send a POST request to the register API endpoint
      await axios.post('/api/users/register', values);

      // Show success message upon successful registration
      message.success('Registered Successfully');

      // Navigate to the login page after registration
      navigate('/login');

      // Hide the loading spinner
      dispatch({ type: 'HIDE_LOADING' });
    } 
    catch (error) {
      // Hide the loading spinner in case of an error
      dispatch({ type: 'HIDE_LOADING' });

      // Show error message for general errors
      message.error('Something Went Wrong');
      
      // Log the error for debugging
      console.log(error);
    }
  };

  // Effect to check if the user is already logged in
  useEffect(() => {
    // If authentication data exists in local storage, navigate to the home page
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [navigate]); // Dependency array: effect runs when 'navigate' changes

  return (
    <>
      <center>
        <div className='register'>
          <div className='register-form'>
            <h1>CAFE</h1>
            <h3>New Registration</h3>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="userId" label="User ID">
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input type='password' />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <p>
                  Already Registered? Please
                  <Link to="/login"> Login Here!</Link>
                </p>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </center>
    </>
  );
};

export default Register;
