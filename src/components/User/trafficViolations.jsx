import React, { useState, useEffect } from 'react';
import './trafficViolations.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TrafficViolationsPage() {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const [violations, setViolations] = useState([]);
  const [selectedViolations, setSelectedViolations] = useState([]);
  const [currentStep, setCurrentStep] = useState('list');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchViolations();
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const username = localStorage.getItem('username');
      if (!username) throw new Error('User not logged in');
  
      const res = await axios.get(`http://localhost:5000/api/user/${username}`);
      console.log('Balance API response:', res.data);
  
      if (res.data?.balance === undefined || res.data.balance === null) {
        throw new Error('Balance not found in server response');
      }
  
      setBalance(res.data.balance);
      setPaymentError('');
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setPaymentError(error.response?.data?.message || 'Unable to retrieve balance');
    }
  };

  const fetchViolations = async () => {
    try {
      setIsLoading(true);
      const username = localStorage.getItem('username');
      if (!username) {
        navigate('/login');
        return;
      }

      const res = await axios.get(`http://localhost:5000/api/${username}/violations`);
      const formattedViolations = res.data.data.map(v => ({
        _id: v._id,
        number: v.number || `VIO-${v._id.toString().slice(-6).toUpperCase()}`,
        date: v.date || new Date().toISOString(),
        amount: v.amount || 0,
        location: v.location || 'Location not specified',
        car: v.car || 'Vehicle not specified',
        paid: v.paid || false
      }));

      setViolations(formattedViolations);
      setPaymentError('');
    } catch (error) {
      console.error('Fetch error:', error);
      const message = error.response?.data?.message || 'Failed to load violations.';
      setPaymentError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleViolation = (id) => {
    setSelectedViolations(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const selectAllViolations = () => {
    const unpaidIds = violations.filter(v => !v.paid).map(v => v._id);
    setSelectedViolations(selectedViolations.length === unpaidIds.length ? [] : unpaidIds);
  };

  const handlePayment = () => setCurrentStep('payment');

  const confirmPayment = async () => {
    const selected = violations.filter(v => selectedViolations.includes(v._id));
    const totalAmount = selected.reduce((sum, v) => sum + v.amount, 0);

    if (balance >= totalAmount) {
      setIsProcessing(true);
      try {
        const username = localStorage.getItem('username');
        const res = await axios.post('http://localhost:5000/api/pay-violations', {
          username,
          violationIds: selectedViolations
        });

        // Update balance after payment
        setBalance(res.data.newBalance);
        setPaymentSuccess(true);

        setTimeout(() => {
          setIsProcessing(false);
          setPaymentSuccess(false);
          setSelectedViolations([]);
          setCurrentStep('list');
          fetchViolations(); // Reload violations after payment
        }, 2000);
      } catch (error) {
        console.error('Payment error:', error);
        setPaymentError(error.response?.data?.message || 'Payment failed');
        setIsProcessing(false);
      }
    } else {
      setPaymentError('Insufficient balance');
      setTimeout(() => setPaymentError(''), 3000);
    }
  };

  const sortedViolations = [...violations].sort((a, b) => new Date(b.date) - new Date(a.date));
  const unpaidViolations = sortedViolations.filter(v => !v.paid);
  const paidViolations = sortedViolations.filter(v => v.paid);
  const allViolations = [...unpaidViolations, ...paidViolations];

  const totalAmount = violations
    .filter(v => selectedViolations.includes(v._id))
    .reduce((sum, v) => sum + v.amount, 0);

  return (
    <div className="violations-container">
      {isLoading && (
        <div className="violations-processing">
          <div className="violations-spinner"></div>
          <p>Loading violations data...</p>
        </div>
      )}

      {isProcessing && (
        <div className="violations-processing">
          <div className="violations-spinner"></div>
          <p>Processing your payment...</p>
        </div>
      )}

      {paymentSuccess && (
        <div className="violations-success">
          <div className="violations-success-icon">✓</div>
          <h3>Payment Successful!</h3>
          <p>Your violations have been paid</p>
        </div>
      )}

      {paymentError && !isProcessing && !isLoading && (
        <div className="violations-error">
          <p>{paymentError}</p>
          <button onClick={fetchViolations} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <header className="insurance-header">
        <h1>Traffic Violations Payments</h1>
        {balance !== null && (
          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
            Current Balance: {balance} SAR
          </p>
        )}
      </header>

      <main className="main-content">
        <header className="violations-header">
          <h3>View and pay your traffic violations</h3>
        </header>

        {currentStep === 'list' ? (
          <div className="violations-list-container">
            {allViolations.length === 0 && !isLoading ? (
              <div className="no-violations">
                <span className="material-icons">check_circle</span>
                <h3>No Violations Found</h3>
                <p>You currently have no traffic violations.</p>
              </div>
            ) : (
              <>
                {unpaidViolations.length > 0 && (
                  <div className="violations-actions">
                    <button 
                      className={`select-all-btn ${
                        selectedViolations.length === unpaidViolations.length ? 'active' : ''
                      }`}
                      onClick={selectAllViolations}
                    >
                      {selectedViolations.length === unpaidViolations.length 
                        ? 'Deselect All' 
                        : 'Select All'}
                    </button>

                    {selectedViolations.length > 0 && (
                      <button className="pay-btn" onClick={handlePayment}>
                        Pay Selected ({selectedViolations.length})
                      </button>
                    )}
                  </div>
                )}

                <div className="violations-list">
                  {allViolations.map(violation => (
                    <div 
                      key={violation._id}
                      className={`violation-card ${
                        violation.paid ? 'paid' : ''
                      } ${selectedViolations.includes(violation._id) ? 'selected' : ''}`}
                    >
                      <div className="violation-checkbox">
                        {!violation.paid && (
                          <input
                            type="checkbox"
                            checked={selectedViolations.includes(violation._id)}
                            onChange={() => toggleViolation(violation._id)}
                          />
                        )}
                      </div>

                      <div className="violation-details">
                        <h3>Violation #{violation.number}</h3>
                        <p><strong>Date:</strong> {new Date(violation.date).toLocaleDateString()}</p>
                        <p><strong>Location:</strong> {violation.location}</p>
                        <p><strong>Amount:</strong> {violation.amount} SAR</p>
                        <p>
                          <strong>Status:</strong>
                          <span className={`status-badge ${violation.paid ? 'paid' : 'unpaid'}`}>
                            {violation.paid ? 'Paid' : 'Unpaid'}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="payment-container">
            <h2>Payment Summary</h2>
            <div className="payment-details">
              <h3>Selected Violations:</h3>
              <ul>
                {violations
                  .filter(v => selectedViolations.includes(v._id))
                  .map(v => (
                    <li key={v._id}>
                      {v.number} - {v.amount} SAR
                    </li>
                  ))}
              </ul>
              <p>Total Amount: {totalAmount} SAR</p>
            </div>

            <div className="payment-actions">
              <button onClick={confirmPayment}>Confirm Payment</button>
              <button onClick={() => setCurrentStep('list')}>Cancel</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TrafficViolationsPage;
