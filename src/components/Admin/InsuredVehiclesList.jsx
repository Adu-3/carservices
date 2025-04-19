import styles from './InsuredVehiclesList.module.css';
import { useState } from 'react';


const initialPolicies = [
  {
    policyNo: '1/11/866209/2025',
    insuranceProvider: 'UNITED INSURANCE',
    insuranceType: '3rd Party',
    coverageLocation: 'Bahrain',
    Duration: 30,
    startDate: '2025-04-01',
    endDate: '2025-04-31',
    policyStatus: 'Active',
    vehicle: 
      {
        nickname: 'Mersmedes Alghanem',
        color: 'Black',
        year: 2022,
        brand: 'Mercedes',
        model: 'c200',
        registrationCountry: 'Saudi Arabia',
        plate: '3755 JKR',
        ownerFullName: 'Mohammed Alghanem',
      },
    
  },
  {
    policyNo: '1/11/866210/2025',
    insuranceProvider: 'Abu Dhabi National Takaful Co.',
    insuranceType: '3rd Party',
    coverageLocation: 'UAE',
    Duration: 30,
    startDate: '2025-04-01',
    endDate: '2025-04-31',
    policyStatus: 'Active',
    vehicle:
      {
        nickname: 'Family Car',
        color: 'Blue',
        year: 2018,
        brand: 'Honda',
        model: 'Civic',
        registrationCountry: 'UAE/Dubai',
        plate: 'DD 222',
        ownerFullName: 'John Doe',
      },
  },
];

function InsuredVehiclesList() {
  const [policy, setpolicy] = useState(initialPolicies);
 
  const cancelPolicy = (policyNo) => {
    if (window.confirm('Are you sure you want to cancel this policy?')) {
      setpolicy(policy.map(p => 
        p.policyNo === policyNo ? { ...p, policyStatus: 'Canceled' } : p
      ));
      alert('Policy canceled successfully!');
    }
  };

  return (
    <>
      <div className={`container ${styles.box}`} style={{ flexDirection: 'column', padding: '30px' }}>
      <div className={styles.logoCombined} style={{ marginBottom: '30px' }}>
        <span className={`material-icons ${styles.logo}`} style={{ fontSize: '100px' }}>shield</span>
        <p className={styles.logoName}>Insured Vehicles</p>
      </div>

      <div className={styles.form} style={{ wpolicyNoth: '100%' }}>
        {policy.map(policy => (
          <div key={policy.policyNo} className="mb-4 p-4 border rounded">
              <>
                <h2 className="text-white text-xl mb-4">Policy Details</h2>
                <p className="text-white mb-4"><strong>Policy No:</strong> {policy.policyNo}</p>
                <p className="text-white mb-4"><strong>Insurance Provider:</strong> {policy.insuranceProvider}</p>
                <p className="text-white mb-4"><strong>Insurance Type:</strong> {policy.insuranceType}</p>
                <p className="text-white mb-4"><strong>Coverage Location:</strong> {policy.coverageLocation}</p>
                <p className="text-white mb-4"><strong>Duration:</strong> {policy.Duration} days</p>
                <p className="text-white mb-4"><strong>Start Date:</strong> {policy.startDate}</p>
                <p className="text-white mb-4"><strong>End Date:</strong> {policy.endDate}</p>
                <p className="text-white mb-4"><strong>Policy Status:</strong> {policy.policyStatus}</p>
                
                {/* Vehicle Details */}

                <div className="mt-4">
                  <h3 className="text-white mb-2">Vehicle:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded bg-gray-800 text-white text-sm">
                    <p className="whitespace-nowrap"><strong>Nickname:</strong> {policy.vehicle.nickname}</p>
                    <p className="whitespace-nowrap"><strong>Color:</strong> {policy.vehicle.color}</p>
                    <p className="whitespace-nowrap"><strong>Year:</strong> {policy.vehicle.year}</p>
                    <p className="whitespace-nowrap"><strong>Brand:</strong> {policy.vehicle.brand}</p>
                    <p className="whitespace-nowrap"><strong>Model:</strong> {policy.vehicle.model}</p>
                    <p className="whitespace-nowrap"><strong>Registration Country:</strong> {policy.vehicle.registrationCountry}</p>
                    <p className="whitespace-nowrap"><strong>Plate:</strong> {policy.vehicle.plate}</p>
                    <p className="break-words"><strong>Owner's Full Name:</strong> {policy.vehicle.ownerFullName}</p>
                  </div>
                </div>
                
                  <button
                  className={`bg-red-600 text-white font-bold py-2 px-4 mt-4 rounded-full cursor-pointer flex ${styles.deleteButton}`}
                  onClick={() => cancelPolicy(policy.policyNo)}
                >
                  Cancel Policy
                </button>
              
              </>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default InsuredVehiclesList;
