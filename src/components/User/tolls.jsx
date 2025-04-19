import React, { useState } from 'react';
import './tolls.css';
const ReceiptComponent = () => {
  const [amount, setAmount] = useState(100); // Changed to state variable
  const [selectedItems, setSelectedItems] = useState([]); // Now supports multiple items
  const [message, setMessage] = useState('');
  const [paidItems, setPaidItems] = useState([]);

  const items = [
    {
      id: 1,
      title: "Sailk",
      price: 40,
    },
    {
      id: 2,
      title: "Darb DARB",
      price: 40,
    },
    {
      id: 3,
      title: "King Fahd Causeway",
      price: 50,
    },
  ];

  const handleItemClick = (item) => {
    if (paidItems.includes(item.id)) return;
    
    setSelectedItems(prev => {
      if (prev.some(i => i.id === item.id)) {
        // If item is already selected, remove it
        return prev.filter(i => i.id !== item.id);
      } else {
        // Otherwise add it
        return [...prev, item];
      }
    });
  };

  const handlePayment = () => {
    if (selectedItems.length === 0) {
      setMessage("Please select at least one item first");
      return;
    }

    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0); // Calculate total price of selected items

    if (amount >= totalPrice) {
      setPaidItems([...paidItems, ...selectedItems.map(item => item.id)]); // ... Add selected items to paid items
      setMessage(`Payment successful for ${selectedItems.map(item => item.title).join(', ')}! Change: ${amount - totalPrice} SAR`);
      setAmount(amount - totalPrice);
      setSelectedItems([]); // Clear selected items after payment
    } else {
      setMessage(`Insufficient funds. You need ${totalPrice - amount} SAR more.`);
    }
  };

  return (
    <div className="receipt-container">
      <h1 className="receipt-title">Tolls List</h1>
      
      <div className="items-list">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`item-card ${selectedItems.some(i => i.id === item.id) ? 'selected' : ''} ${paidItems.includes(item.id) ? 'paid' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <h3>{item.title}</h3>
            <p className="price">Price: {item.price} SAR</p>
            {paidItems.includes(item.id) && <div className="paid-badge">PAID</div>}
          </div>
        ))}
      </div>

      <div className="payment-section">
        <h3>Payment</h3>
        <p>Available Amount: <strong>{amount} SAR</strong></p>
        
        {selectedItems.length > 0 && (
          <div className="selected-item-info">
            <p>Total Due: <strong>{selectedItems.reduce((sum, item) => sum + item.price, 0)} SAR</strong></p>
          </div>
        )}


        <button 
          className="pay-button"
          onClick={handlePayment}
          disabled={selectedItems.length === 0}
        >
          Pay Now
        </button>

        {message && (
          <div className={`message ${amount >= (selectedItems.reduce((sum, item) => sum + item.price, 0) || 0) ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptComponent;