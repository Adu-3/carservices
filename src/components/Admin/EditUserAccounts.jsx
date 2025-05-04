import { useState, useEffect } from 'react';

function EditUserAccounts() {
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ username: '', email: '', age: '' });
  const [editingVehiclesUserId, setEditingVehiclesUserId] = useState(null);
  const [editedVehicles, setEditedVehicles] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'vehicles'

  useEffect(() => {
    const fetchUsersAndVehicles = async () => {
      try {
        const [usersRes, vehiclesRes] = await Promise.all([
          fetch('http://localhost:5000/api/users'),
          fetch('http://localhost:5000/api/vehicles')
        ]);
        const usersData = await usersRes.json();
        const vehiclesData = await vehiclesRes.json();

        const usersWithVehicles = usersData.map(user => ({
          ...user,
          vehicles: vehiclesData.filter(v => {
            const vehicleUserId = typeof v.user === 'object' ? v.user._id : v.user;
            return vehicleUserId === user._id;
          })
        }));

        setUsers(usersWithVehicles);
        setVehicles(vehiclesData);
      } catch (err) {
        console.error('Failed to fetch users or vehicles:', err);
      }
    };

    fetchUsersAndVehicles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const toggleEdit = (user) => {
    setEditingUserId(user._id);
    setEditedUser({ name: user.username, email: user.email, age: user.age });
  };

  const saveChanges = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUser)
      });

      if (!res.ok) throw new Error('Failed to update user');

      setUsers(users.map(user =>
        user._id === editingUserId ? { ...user, ...editedUser } : user
      ));
      alert('User information updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update user.');
    }

    setEditingUserId(null);
    setEditedUser({ name: '', email: '', age: '' });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditedUser({ name: '', email: '', age: '' });
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete user');

        setUsers(users.filter(user => user._id !== id));
        alert('User deleted successfully!');
      } catch (err) {
        console.error(err);
        alert('Failed to delete user.');
      }
    }
  };

  const toggleEditVehicles = (user) => {
    setEditingVehiclesUserId(user._id);
    setEditedVehicles(user.vehicles || []);
    setActiveTab('vehicles');
  };

  const handleVehicleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVehicles = [...editedVehicles];
    updatedVehicles[index] = { ...updatedVehicles[index], [name]: value };
    setEditedVehicles(updatedVehicles);
  };

  const saveVehicleChanges = async () => {
    try {
      await Promise.all(editedVehicles.map(vehicle => {
        if (vehicle._id) {
          // Update existing vehicle
          return fetch(`http://localhost:5000/api/vehicles/${vehicle._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicle)
          });
        } else {
          // Create new vehicle
          return fetch(`http://localhost:5000/api/vehicles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...vehicle, user: editingVehiclesUserId })
          });
        }
      }));

      // Refresh vehicles after save
      const vehiclesRes = await fetch('http://localhost:5000/api/vehicles');
      const vehiclesData = await vehiclesRes.json();

      const updatedUsers = users.map(user => ({
        ...user,
        vehicles: vehiclesData.filter(v => v.user === user._id)
      }));

      setUsers(updatedUsers);
      setVehicles(vehiclesData);

      alert('Vehicle information updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save vehicle changes.');
    }

    setEditingVehiclesUserId(null);
    setEditedVehicles([]);
    setActiveTab('users');
  };

  const cancelVehicleEdit = () => {
    setEditingVehiclesUserId(null);
    setEditedVehicles([]);
    setActiveTab('users');
  };

  const addNewVehicle = () => {
    setEditedVehicles([
      ...editedVehicles,
      {
        nickname: '',
        color: '',
        year: '',
        brand: '',
        model: '',
        registrationCountry: '',
        plateType: '',
        ownerFullName: ''
      }
    ]);
  };

  const removeVehicle = (index) => {
    const updatedVehicles = [...editedVehicles];
    updatedVehicles.splice(index, 1);
    setEditedVehicles(updatedVehicles);
  };

  const currentUser = users.find(user => user._id === editingVehiclesUserId);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-cover bg-center bg-no-repeat mt-15" 
         style={{ backgroundImage: "url(../../assets/Guest/light.png)" }}>
      <div className="bg-black rounded-[60px] w-full max-w-6xl p-8 text-white">
        {/* Header with Logo */}
        <div className="flex flex-col items-center mb-8">
          <span className="material-icons bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent text-8xl md:text-9xl">
            group
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-2"
              style={{ 
                background: 'linear-gradient(60deg, #0095FF, #00FFCC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
            Manage Users
          </h1>
        </div>

        {/* Main Content */}
        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Age</th>
                  <th className="py-3 px-4 text-left">Vehicles</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b border-gray-800 hover:bg-gray-900">
                    <td className="py-3 px-4">{user.username}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.age || '-'}</td>
                    <td className="py-3 px-4">{user.vehicles?.length || 0}</td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button 
                        onClick={() => toggleEdit(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => toggleEditVehicles(user)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                      >
                        Vehicles
                      </button>
                      <button 
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {editingUserId && (
                  <tr className="bg-gray-800">
                    <td colSpan="5" className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input
                            type="text"
                            name="username"
                            value={editedUser.username}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Age</label>
                          <input
                            type="number"
                            name="age"
                            value={editedUser.age}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-4 space-x-3">
                        <button
                          onClick={cancelEdit}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveChanges}
                          className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-full shadow"
                        >
                          Save Changes
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Vehicles Edit Form */}
        {activeTab === 'vehicles' && currentUser && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Editing Vehicles for <span className="text-blue-400">{currentUser.username}</span>
              </h2>
              <button 
                onClick={() => setActiveTab('users')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full"
              >
                Back to Users
              </button>
            </div>

            {editedVehicles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400 mb-4">No vehicles found for this user.</p>
                <button 
                  onClick={addNewVehicle}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
                >
                  Add New Vehicle
                </button>
              </div>
            ) : (
              <>
                {editedVehicles.map((vehicle, index) => (
                  <div key={index} className="mb-6 p-6 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-xl font-bold">Vehicle #{index + 1}</h3>
                      <button 
                        onClick={() => removeVehicle(index)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {['nickname', 'color', 'year', 'make', 'model', 'country', 'plateNumber', 'ownerName'].map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                          <input
                            type={field === 'year' ? 'number' : 'text'}
                            name={field}
                            value={vehicle[field] || ''}
                            onChange={(e) => handleVehicleChange(index, e)}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mt-6">
                  <button 
                    onClick={addNewVehicle}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
                  >
                    Add Another Vehicle
                  </button>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={cancelVehicleEdit}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={saveVehicleChanges}
                      className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-full shadow"
                    >
                      Save All Changes
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditUserAccounts;
