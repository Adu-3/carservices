import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './trafficViolations.css';

function TrafficViolationsPage({ balance, setBalance }) {
  const navigate = useNavigate();
  const [violations, setViolations] = useState([]);
  const [selectedViolations, setSelectedViolations] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const plateNumber = localStorage.getItem('userPlateNumber') || 'ABC1234'; 

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/violations/${plateNumber}`);
        setViolations(res.data);
      } catch (err) {
        setError('Failed to load violations');
        console.error('Backend error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchViolations();
  }, [plateNumber]);

  const confirmPayment = async () => {
    setIsProcessing(true);
    try {
      await axios.post('http://localhost:5000/api/violations/pay', {
        violationIds: selectedViolations,
      });
      
      setViolations(violations.map(v => 
        selectedViolations.includes(v._id) ? { ...v, paid: true } : v
      ));
      setPaymentSuccess(true);
      setSelectedViolations([]);
    } catch (err) {
      setError('Payment failed. Try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const unpaidViolations = violations.filter(v => !v.paid);

  return (
    <div className="violations-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {unpaidViolations.map(violation => (
            <div key={violation._id}>
              <input
                type="checkbox"
                checked={selectedViolations.includes(violation._id)}
                onChange={() => toggleViolation(violation._id)}
              />
              <span>Violation #{violation.violationNumber} - {violation.amount} SAR</span>
            </div>
          ))}

          <button 
            onClick={confirmPayment}
            disabled={selectedViolations.length === 0 || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pay Selected'}
          </button>
        </>
      )}
    </div>
  );
}

export default TrafficViolationsPage;