import React from 'react';
import { useNavigate } from 'react-router-dom';
import Imagelink from '../../assets/Guest/Correct.png'; // Import the image

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height to center the image
        textAlign: 'center',
      }}
    >
      {/* Payment Success Image */}
      <img
        src={Imagelink}
        alt="Payment success"
        style={{
          maxWidth: '50%',
          maxHeight: '70vh',
          objectFit: 'contain',
        }}
      />
{/* Payment Success Text */}
<p
        style={{
          fontSize: '30px', // Adjust font size here
          fontWeight: 'bold', // Optional: Make the text bold
          marginTop: '20px', // Add spacing between the image and text
          color: 'black', // Text color
        }}
      >
        Payment process was succeeded

      </p>     {/* Back to Dashboard Button */}
     <button
        onClick={() => navigate('/dashboard')}
        style={{
          marginTop: '40px', // Add spacing between the image and button
          padding: '30px', // Equal padding for a square shape
          fontSize: '16px',
          backgroundColor: '#317e9cb9', // aqua background color
          color: 'white',
          border: 'none',
          borderRadius: '0px', // Remove rounded corners
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          width: '500px', // Set a fixed width
          height: '10px', // Set a fixed height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Back to dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;