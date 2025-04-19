import './buyInsurance.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InsurancePage({ balance, setBalance }) {
  const navigate = useNavigate();
  
  const [vehicles, setVehicles] = useState([
    { 
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      plate: 'AIC 1524',
      year: '2023',
      insuranceStatus: 'Not Insured',
      plans: [
        { id: 1, name: 'Basic', price: 150, coverage: 'Third-party' },
        { id: 2, name: 'Premium', price: 300, coverage: 'Full' }
      ]
    },
    { 
      id: 2,
      make: 'Honda',
      model: 'Accord',
      plate: 'ATC 1254',
      year: '2019',
      insuranceStatus: 'Fully Covered',
      plans: [
        { id: 3, name: 'Standard', price: 250, coverage: 'Comprehensive' }
      ]
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [insuranceError, setInsuranceError] = useState('');

  const handleNext = () => {
    if (currentStep === 1 && selectedVehicle) {
      if (selectedVehicle.insuranceStatus === 'Fully Covered') {
        setInsuranceError('This vehicle is already fully insured. You cannot insure it again.');
        return;
      }
      setInsuranceError('');
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedPlan) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 2) {
        setSelectedPlan(null);
      }
    }
  };

  const handleConfirm = () => {
    if (!selectedPlan) {
      setPaymentError('Please select a plan first');
      setTimeout(() => setPaymentError(''), 3000);
      return;
    }

    // تحقق إضافي من الرصيد حتى لو كان الزر معطلاً
    if (balance < selectedPlan.price) {
      setPaymentError('Insufficient balance to purchase this plan');
      setTimeout(() => setPaymentError(''), 3000);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setBalance(balance - selectedPlan.price);
        
        const updatedVehicles = vehicles.map(vehicle => {
          if (vehicle.id === selectedVehicle.id) {
            vehicle.insuranceStatus = selectedPlan.coverage === 'Full' ? 'Fully Covered' : 'Third-Party Insured';
          }
          return vehicle;
        });
        setVehicles(updatedVehicles);
        localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));

        setPaymentSuccess(false);
        navigate('/');
      }, 2000);
    }, 2000);
  };

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem('vehicles'));
    if (storedVehicles) {
      setVehicles(storedVehicles);
    }
  }, []);

  return (
    <div className="insurance-container">
      <header className="insurance-header">
        <button className="insurance-home-btn" onClick={() => navigate('/')}>
          Home
        </button>
        <h1>Vehicle Insurance Purchase</h1>
      </header>

      <div className="insurance-progress">
        <span className={`insurance-step ${currentStep >= 1 ? 'active' : ''}`}>1. Select Vehicle</span>
        <span className="insurance-separator">➤</span>
        <span className={`insurance-step ${currentStep >= 2 ? 'active' : ''}`}>2. Choose Plan</span>
        <span className="insurance-separator">➤</span>
        <span className={`insurance-step ${currentStep >= 3 ? 'active' : ''}`}>3. Confirm</span>
      </div>

      {isProcessing && (
        <div className="insurance-processing">
          <div className="insurance-spinner"></div>
          <p>Processing your payment...</p>
        </div>
      )}

      {paymentSuccess && (
        <div className="insurance-success">
          <div className="insurance-success-icon">✓</div>
          <h3>Payment Successful!</h3>
          <p>Your insurance is now active</p>
        </div>
      )}

      {(paymentError || insuranceError) && (
        <div className="insurance-error">
          {paymentError || insuranceError}
        </div>
      )}

      {currentStep === 1 && (
        <div className="insurance-step-content">
          <h2>Select Your Vehicle</h2>
          <div className="insurance-vehicles">
            {vehicles.map(vehicle => (
              <div 
                key={vehicle.id}
                className={`insurance-vehicle ${selectedVehicle?.id === vehicle.id ? 'selected' : ''}`}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                <h3>{vehicle.make} {vehicle.model}</h3>
                <div className="insurance-vehicle-details">
                  <p>Model: {vehicle.year}</p>
                  <p>Plate: {vehicle.plate}</p>
                  <p>Status: {vehicle.insuranceStatus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentStep === 2 && selectedVehicle && (
        <div className="insurance-step-content">
          <div className="insurance-nav">
            <button className="insurance-back-btn" onClick={handleBack}>
              Back
            </button>
            <h2>Choose Insurance Plan</h2>
          </div>
          
          <div className="insurance-selected-vehicle">
            <h3>{selectedVehicle.make} {selectedVehicle.model}</h3>
            <p>Model: {selectedVehicle.year} • Plate: {selectedVehicle.plate}</p>
          </div>

          <div className="insurance-plans">
            {selectedVehicle.plans.map(plan => (
              <div 
                key={plan.id}
                className={`insurance-plan ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="insurance-plan-header">
                  <h4>{plan.name}</h4>
                  <span className="insurance-plan-price">{plan.price} SAR</span>
                </div>
                <p className="insurance-plan-coverage">{plan.coverage} Coverage</p>
                <div className="insurance-plan-balance">
                  <span>Your Balance: </span>
                  <span className={balance < 0 ? 'negative-balance' : 'positive-balance'}>
                    {balance} SAR
                  </span>
                  <span> • Remaining: </span>
                  <span className={balance - plan.price < 0 ? 'negative-balance' : 'positive-balance'}>
                    {balance - plan.price} SAR
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentStep === 3 && selectedVehicle && selectedPlan && (
        <div className="insurance-step-content">
          <div className="insurance-nav">
            <button className="insurance-back-btn" onClick={handleBack}>
              Back
            </button>
            <h2>Confirm Your Purchase</h2>
          </div>

          <div className="insurance-summary">
            <h3>Order Summary</h3>
            <div className="insurance-summary-row">
              <span>Vehicle:</span>
              <span>{selectedVehicle.make} {selectedVehicle.model}</span>
            </div>
            <div className="insurance-summary-row">
              <span>Plate:</span>
              <span>{selectedVehicle.plate}</span>
            </div>
            <div className="insurance-summary-row">
              <span>Insurance Plan:</span>
              <span>{selectedPlan.name}</span>
            </div>
            <div className="insurance-summary-row">
              <span>Coverage:</span>
              <span>{selectedPlan.coverage}</span>
            </div>
            <div className="insurance-summary-row">
              <span>Current Balance:</span>
              <span>{balance} SAR</span>
            </div>
            <div className="insurance-summary-row total">
              <span>Total Amount:</span>
              <span className="insurance-summary-price">{selectedPlan.price} SAR</span>
            </div>
            <div className="insurance-summary-row remaining">
              <span>Remaining Balance:</span>
              <span className={balance - selectedPlan.price < 0 ? 'negative-balance' : 'positive-balance'}>
                {balance - selectedPlan.price} SAR
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="insurance-actions">
        {currentStep === 1 && selectedVehicle && (
          <button className="insurance-next-btn" onClick={handleNext}>
            Next
          </button>
        )}
        {currentStep === 2 && selectedPlan && (
          <button className="insurance-next-btn" onClick={handleNext}>
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button 
            className="insurance-confirm-btn"
            onClick={handleConfirm}
          >
            Confirm & Pay
          </button>
        )}
      </div>
    </div>
  );
}

export default InsurancePage;