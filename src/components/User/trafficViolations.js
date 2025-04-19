import React, { useState, useEffect } from 'react';
import './trafficViolations.css';
import { useNavigate } from 'react-router-dom';

function TrafficViolationsPage({ balance, setBalance }) {
  const navigate = useNavigate();

  const defaultViolations = [
    { id: 1, number: 'VIO-2023-001', date: '2023-05-15', amount: 150, location: 'Riyadh, King Fahd Rd', paid: false, car: 'ABC 1234' },
    { id: 2, number: 'VIO-2023-002', date: '2023-06-20', amount: 300, location: 'Jeddah, Corniche', paid: false, car: 'XYZ 5678' },
    { id: 3, number: 'VIO-2023-003', date: '2023-07-10', amount: 100, location: 'Dammam, Prince Mohammed St', paid: true, car: 'ABC 1234' }
  ];

  const [violations, setViolations] = useState([]);
  const [selectedViolations, setSelectedViolations] = useState([]);
  const [currentStep, setCurrentStep] = useState('list');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // تحميل البيانات من localStorage عند بداية التشغيل
  useEffect(() => {
    const storedViolations = localStorage.getItem('violations');
    if (storedViolations) {
      setViolations(JSON.parse(storedViolations));
    } else {
      setViolations(defaultViolations);
    }
  }, []);

  // دالة لتحديث البيانات في localStorage
  const updateLocalStorage = (newViolations) => {
    localStorage.setItem('violations', JSON.stringify(newViolations));
  };

  const toggleViolation = (id) => {
    if (selectedViolations.includes(id)) {
      setSelectedViolations(selectedViolations.filter(v => v !== id));
    } else {
      setSelectedViolations([...selectedViolations, id]);
    }
  };

  const selectAllViolations = () => {
    if (selectedViolations.length === violations.filter(v => !v.paid).length) {
      setSelectedViolations([]);
    } else {
      setSelectedViolations(violations.filter(v => !v.paid).map(v => v.id));
    }
  };

  const handlePayment = () => {
    setCurrentStep('payment');
  };

  const confirmPayment = () => {
    const totalAmount = violations
      .filter(v => selectedViolations.includes(v.id))
      .reduce((sum, v) => sum + v.amount, 0);

    if (balance >= totalAmount) {
      setIsProcessing(true);
      setTimeout(() => {
        setBalance(balance - totalAmount);
        const updatedViolations = violations.map(v =>
          selectedViolations.includes(v.id) ? { ...v, paid: true } : v
        );
        setViolations(updatedViolations);
        updateLocalStorage(updatedViolations); // تحديث التخزين
        setSelectedViolations([]);
        setIsProcessing(false);
        setPaymentSuccess(true);
        setTimeout(() => {
          setPaymentSuccess(false);
          setCurrentStep('list');
        }, 2000);
      }, 2000);
    } else {
      setPaymentError('Insufficient balance to complete the payment');
      setTimeout(() => setPaymentError(''), 3000);
    }
  };

  // ترتيب المخالفات حسب تاريخ المخالفة (الأحدث في الأعلى)
  const sortedViolations = violations.sort((a, b) => new Date(b.date) - new Date(a.date));

  // ترتيب المخالفات غير المدفوعة أولاً ثم المدفوعة
  const unpaidViolations = sortedViolations.filter(v => !v.paid);
  const paidViolations = sortedViolations.filter(v => v.paid);

  // دمج المخالفات المدفوعة وغير المدفوعة بعد الترتيب
  const allViolations = [...unpaidViolations, ...paidViolations];

  const totalAmount = allViolations
    .filter(v => selectedViolations.includes(v.id))
    .reduce((sum, v) => sum + v.amount, 0);

  const unpaidViolationsCount = allViolations.filter(v => !v.paid).length;

  return (
    <div className="violations-container">
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="violations-processing">
          <div className="violations-spinner"></div>
          <p>Processing your payment...</p>
        </div>
      )}

      {/* Success Overlay */}
      {paymentSuccess && (
        <div className="violations-success">
          <div className="violations-success-icon">✓</div>
          <h3>Payment Successful!</h3>
          <p>Your violations have been paid</p>
        </div>
      )}

      {/* Error Message */}
      {paymentError && (
        <div className="violations-error">
          {paymentError}
        </div>
      )}

      <header className="insurance-header">
        <button className="insurance-home-btn" onClick={() => navigate('/')}>
          Home
        </button>
        <h1>Traffic Violations Payments</h1>
      </header>

      <main className="main-content">
        <header className="violations-header">
          <h3>View and pay your traffic violations</h3>
        </header>

        {currentStep === 'list' ? (
          <div className="violations-list-container">
            {allViolations.length === 0 ? (
              <div className="no-violations">
                <span className="material-icons">check_circle</span>
                <h3>No Violations Found</h3>
                <p>You currently have no traffic violations.</p>
              </div>
            ) : (
              <>
                {unpaidViolationsCount > 0 && (
                  <div className="violations-actions">
                    {selectedViolations.length === unpaidViolationsCount ? (
                      <button 
                        className="select-all-btn active"
                        onClick={selectAllViolations}
                      >
                        Deselect All
                      </button>
                    ) : (
                      <button 
                        className="select-all-btn"
                        onClick={selectAllViolations}
                      >
                        Select All
                      </button>
                    )}
                    
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
                      key={violation.id} 
                      className={`violation-card ${violation.paid ? 'paid' : ''} ${selectedViolations.includes(violation.id) ? 'selected' : ''}`}
                    >
                      <div className="violation-checkbox">
                        {!violation.paid && (
                          <input
                            type="checkbox"
                            checked={selectedViolations.includes(violation.id)}
                            onChange={() => toggleViolation(violation.id)}
                          />
                        )}
                      </div>
                      
                      <div className="violation-details">
                        <h3>Violation #{violation.number}</h3>
                        <p><strong>Date:</strong> {violation.date}</p>
                        <p><strong>Location:</strong> {violation.location}</p>
                        <p><strong>Amount:</strong> {violation.amount} SAR</p>
                        <p><strong>Status:</strong> 
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
                {allViolations
                  .filter(v => selectedViolations.includes(v.id))
                  .map(v => (
                    <li key={v.id}>
                      #{v.number} - {v.amount} SAR ({v.date})
                    </li>
                  ))}
              </ul>
              
              <div className="total-amount">
                <h3>Total Amount:</h3>
                <p>{totalAmount} SAR</p>
              </div>

              <div className="balance-info">
                <h3>Current Balance:</h3>
                <p>{balance} SAR</p>
              </div>

              <div className="remaining-balance">
                <h3>Remaining Balance:</h3>
                <p className={balance - totalAmount < 0 ? 'negative' : ''}>
                  {balance - totalAmount} SAR
                </p>
              </div>
              
              <div className="payment-methods">
                <h3>Payment Method:</h3>
                <div className="method-options">
                  <label>
                    <input type="radio" name="paymentMethod" defaultChecked />
                    Credit/Debit Card
                  </label>
                  <label>
                    <input type="radio" name="paymentMethod" />
                    Apple Pay
                  </label>
                  <label>
                    <input type="radio" name="paymentMethod" />
                    Mada
                  </label>
                </div>
              </div>
              
              <div className="payment-buttons">
                <button className="back-btn" onClick={() => setCurrentStep('list')}>
                  Back to Violations
                </button>
                <button 
                  className={`confirm-pay-btn ${balance < totalAmount ? 'disabled' : ''}`}
                  onClick={confirmPayment}
                  disabled={balance < totalAmount}
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TrafficViolationsPage;
