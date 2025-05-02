import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tolls.css';

const ReceiptComponent = () => {
  const [balance, setBalance] = useState(0);
  const [tolls, setTolls] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [message, setMessage] = useState('');
  const [paidTolls, setPaidTolls] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [balanceRes, tollsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/balance'),
          axios.get('http://localhost:5000/api/tolls')
        ]);
        
        console.log('API Responses:', { balance: balanceRes.data, tolls: tollsRes.data });
        
        setBalance(balanceRes.data.balance);
        setTolls(tollsRes.data);
        setPaidTolls(balanceRes.data.paidTolls || []);
      } catch (error) {
        console.error('Failed to load data:', {
          error: error.message,
          response: error.response?.data
        });
        setMessage('Failed to load toll data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleItemClick = (tollId) => {
    if (paidTolls.includes(tollId)) return;
    
    setSelectedIds(prev => 
      prev.includes(tollId) 
        ? prev.filter(id => id !== tollId)
        : [...prev, tollId]
    );
  };

  const handlePayment = async () => {
    if (selectedIds.length === 0) {
      setMessage("Please select at least one toll first");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/pay-tolls', {
        tollIds: selectedIds
      });

      setBalance(response.data.newBalance);
      setPaidTolls(response.data.paidTolls);
      setMessage(`Payment successful! New balance: ${response.data.newBalance} SAR`);
      setSelectedIds([]);
    } catch (error) {
      console.error('Payment failed:', error.response?.data);
      setMessage(error.response?.data?.message || 'Payment failed. Please try again.');
    }
  };

  // Calculate total
  const totalDue = tolls
    .filter(toll => selectedIds.includes(toll._id))
    .reduce((sum, toll) => sum + toll.price, 0);

  if (loading) {
    return (
      <div className="receipt-container">
        <h1 className="receipt-title">Tolls List</h1>
        <div className="loading-message">Loading toll data...</div>
      </div>
    );
  }

  return (
    <div className="receipt-container">
      <h1 className="receipt-title">Tolls List</h1>
      
      {tolls.length === 0 ? (
        <div className="no-tolls-message">
          No tolls available. Please check the database connection.
        </div>
      ) : (
        <>
          <div className="items-list">
            {tolls.map(toll => (
              <div 
                key={toll._id}
                className={`item-card 
                  ${selectedIds.includes(toll._id) ? 'selected' : ''} 
                  ${paidTolls.includes(toll._id) ? 'paid' : ''}`}
                onClick={() => handleItemClick(toll._id)}
              >
                <h3>{toll.title}</h3>
                <p className="price">Price: {toll.price} SAR</p>
                {paidTolls.includes(toll._id) && (
                  <div className="paid-badge">PAID</div>
                )}
              </div>
            ))}
          </div>

          <div className="payment-section">
            <h3>Payment</h3>
            <p>Available Amount: <strong>{balance} SAR</strong></p>
            
            {selectedIds.length > 0 && (
              <div className="selected-items">
                <p>Selected Tolls: {selectedIds.length}</p>
                <p>Total Due: <strong>{totalDue} SAR</strong></p>
              </div>
            )}

            <button
              className={`pay-button ${selectedIds.length === 0 ? 'disabled' : ''}`}
              onClick={handlePayment}
              disabled={selectedIds.length === 0}
            >
              Pay Now
            </button>

            {message && (
              <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReceiptComponent;