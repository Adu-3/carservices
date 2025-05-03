import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddingMoney.css';

const AddingMoney = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    amount: ''
  });

  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:5000/api/balance/${username}`);
        setBalance(response.data.balance);
      } catch (error) {
        setMessage('Failed to fetch balance');
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  const handleAddMoney = async (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
  
    if (isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }
  
    try {
      // 1. Clean card number
      const cleanCard = formData.cardNumber.replace(/\s/g, '');
      
      // 2. Format expiry month
      const expiry = `${formData.expiryMonth.padStart(2, '0')}/${formData.expiryYear}`;
  
      await axios.post('http://localhost:5000/api/validate-card', { // Absolute URL
        cardNumber: cleanCard, // Use cleaned number
        cardName: formData.cardName,
        expiry, // Formatted date
        cvv: formData.cvv,
        amount
      });
  
      const username = localStorage.getItem('username');

      const response = await axios.post('http://localhost:5000/api/update-balances', {
        cardNumber: cleanCard,
        amount,
        username // send it with request
      });
      
  
      setBalance(response.data.newBalance);
      navigate('/user/');
    } catch (error) {
      console.error('Transaction error:', error.response?.data); // Add this
      setMessage(error.response?.data?.message || 'Transaction failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="credit-card-form">
      <h2>Add Payment Method</h2>
      {loading ? (
        <div>Loading balance...</div>
      ) : (
        <>
          <div className="current-balance">
            Current Balance:  &nbsp;
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginLeft: '5px' }}>
              <img
                src={require('../../assets/Saudi_Riyal_Symbol-1.png')}
                alt="SAR"
                style={{ width: '18px', height: '18px', verticalAlign: 'middle' }}
              />
              {balance.toFixed(2)}
            </span>
          </div>

          {message && <div className="message">{message}</div>}
          <form onSubmit={handleAddMoney}>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="Enter card number"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength={19}
                required
              />
            </div>

            <div className="form-group">
              <label>Cardholder's Full Name</label>
              <input
                type="text"
                name="cardName"
                placeholder="Enter name here...."
                value={formData.cardName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <div className="expiry-inputs">
                  <input
                    type="text"
                    name="expiryMonth"
                    placeholder="MM"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                    maxLength="2"
                    required
                  />
                  <span>/</span>
                  <input
                    type="text"
                    name="expiryYear"
                    placeholder="YY"
                    value={formData.expiryYear}
                    onChange={handleChange}
                    maxLength="2"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  placeholder="Enter CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Amount of Money to Add</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter Amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0.01"
                step="0.01"
              />
            </div>

            <button type="submit" className="submit-button">Add Amount</button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddingMoney;