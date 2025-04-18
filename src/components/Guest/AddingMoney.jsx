import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddingMoney.css';

const testCards = [
  {
    id: 1,
    number: '4242 4242 4242 4242',
    name: 'mohammed',
    expiry: '12/25',
    cvv: '123',
    balance: 1000
  },
  {
    id: 2,
    number: '5555 5555 5555 5555',
    name: 'ahmed',
    expiry: '06/24',
    cvv: '456',
    balance: 500
  }
];

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
  const [balance, setBalance] = useState(100);
  const navigate = useNavigate();

  const handleAddMoney = (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);

    if (isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }

    const expiry = `${formData.expiryMonth}/${formData.expiryYear}`;

    const matchedCard = testCards.find(card =>
      card.number === formData.cardNumber &&
      card.name === formData.cardName &&
      card.expiry === expiry &&
      card.cvv === formData.cvv
    );

    if (!matchedCard) {
      setMessage('Invalid card details');
      return;
    }

    if (amount > matchedCard.balance) {
      setMessage('Insufficient funds on card');
      return;
    }

    const newBalance = balance + amount;
    setBalance(newBalance);
    localStorage.setItem('userBalance', newBalance.toString());
    navigate('/payment-success');
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

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="credit-card-form">
      <h2>Add Payment Method</h2>
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
    </div>
  );
};

export default AddingMoney;
