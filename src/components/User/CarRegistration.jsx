import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Car } from 'lucide-react';
import axios from 'axios';

export default function CarRegistrationPage() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    nickname: '',
    ownerName: '',
    color: '',
    year: '',
    make: '',
    model: '',
    country: '',
    plateNumber: ''
  });
  const [message, setMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/vehicles/${username}`);
        if (res.data.length > 0) {
          setVehicles(res.data);
        }
      } catch (err) {
        console.error('Error fetching vehicles:', err);
      }
    };
    fetchVehicles();
  }, [username]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      // Validate form data
      for (const field in formData) {
        if (!formData[field]) {
          setMessage(`Please fill in the ${field} field`);
          return;
        }
      }

      const payload = { ...formData, username };
      const res = await axios.post('http://localhost:5000/api/vehicles', payload);
      
      // Update vehicles list with the new vehicle
      setVehicles([...vehicles, res.data.vehicle]);
      
      // Reset form
      setFormData({
        nickname: '',
        ownerName: '',
        color: '',
        year: '',
        make: '',
        model: '',
        country: '',
        plateNumber: ''
      });
      setMessage('Car registered successfully.');
      setIsFormVisible(false);
    } catch (err) {
      console.error('Registration failed:', err);
      setMessage('Failed to register car.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
      const updatedVehicles = vehicles.filter(v => v._id !== id);
      setVehicles(updatedVehicles);
      setMessage('Car deleted successfully.');
    } catch (err) {
      console.error('Deletion failed:', err);
      setMessage('Failed to delete car.');
    }
  };

  return (
    <div className="w-full bg-black p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-4">
      <div className="flex items-center justify-center mb-8">
        <span className="material-icons bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent">directions_car</span>
        <h1 className="text-3xl font-bold bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent">
          Car Registration
        </h1>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-gray-800 text-white rounded text-center">
          {message}
        </div>
      )}

      {/* Add new car button */}
      {!isFormVisible && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsFormVisible(true)}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add New Vehicle
          </button>
        </div>
      )}

      {/* Registration Form */}
      {isFormVisible && (
        <div className="bg-black p-5 rounded-lg mb-8 border-2">
          <h2 className="text-xl text-white mb-4 font-medium">Register New Vehicle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData).map((field) => (
              <div key={field} className="mb-2">
                <label className="block text-gray-400 text-sm mb-1 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type={field === 'year' ? 'number' : 'text'}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white rounded p-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="flex mt-4 gap-3">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex-1 transition-colors"
            >
              Register Car
            </button>
            <button
              onClick={() => setIsFormVisible(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Vehicles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <div key={vehicle._id} className="bg-gray-900 p-4 rounded-lg relative">
              <h3 className="text-lg font-medium text-blue-400 mb-2">{vehicle.nickname}</h3>
              <div className="text-gray-300">
                <p><span className="text-gray-500">Owner:</span> {vehicle.ownerName}</p>
                <p>
                  <span className="text-gray-500">Vehicle:</span> {vehicle.year} {vehicle.make} {vehicle.model}
                </p>
                <p><span className="text-gray-500">Color:</span> {vehicle.color}</p>
                <p><span className="text-gray-500">Country:</span> {vehicle.country}</p>
                <p><span className="text-gray-500">Plate:</span> {vehicle.plateNumber}</p>
              </div>
              <button
                onClick={() => handleDelete(vehicle._id)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Delete car"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-8">
            No vehicles registered yet. Click "Add New Vehicle" to get started.
          </div>
        )}
      </div>
    </div>
  );
}