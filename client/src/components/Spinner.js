import React from 'react'; // Import React library for building UI components

// Define the Spinner component
const Spinner = () => {
  return (
    <div className='spinner'> {/* Container for the spinner */}
      {/* Bootstrap spinner component */}
      <div className="spinner-border" role="status">
        <span className="sr-only"></span> {/* Screen reader text for accessibility */}
      </div>
    </div>
  );
};

export default Spinner; // Export the Spinner component for use in other parts of the application
