import React from 'react';
import { useNavigate } from 'react-router-dom';
import Imagelink from '../../assets/Guest/Correct.png';
import './PaymentSuccess.css'; // Import the CSS file

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success-container">
      {/* Payment Success Image */}
      <img
        src={Imagelink}
        alt="Payment success"
        className="success-image"
      />
      
      {/* Payment Success Text */}
      <h2 className="success-message">
        Payment process was successful
      </h2>

      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="dashboard-button"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;