import styles from './EditUserAccountsStyle.module.css';
import { useState, useEffect } from 'react';

function EditUserAccounts() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: '', email: '', age: '' });
  const [editingVehiclesUserId, setEditingVehiclesUserId] = useState(null);
  const [editedVehicles, setEditedVehicles] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const toggleEdit = (user) => {
    setEditingUserId(user._id);
    setEditedUser({ name: user.name, email: user.email, age: user.age });
  };

  const saveChanges = () => {
    setUsers(users.map(user => 
      user._id === editingUserId ? { ...user, ...editedUser } : user
    ));
    alert('User information updated successfully!');
    setEditingUserId(null);
    setEditedUser({ name: '', email: '', age: '' });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditedUser({ name: '', email: '', age: '' });
  };

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user._id !== id));
      alert('User deleted successfully!');
    }
  };

  const toggleEditVehicles = (user) => {
    setEditingVehiclesUserId(user._id);
    setEditedVehicles(user.vehicles || []);
  };

  const handleVehicleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVehicles = [...editedVehicles];
    updatedVehicles[index] = { ...updatedVehicles[index], [name]: value };
    setEditedVehicles(updatedVehicles);
  };

  const saveVehicleChanges = () => {
    setUsers(users.map(user =>
      user._id === editingVehiclesUserId ? { ...user, vehicles: editedVehicles } : user
    ));
    alert('Vehicle information updated successfully!');
    setEditingVehiclesUserId(null);
    setEditedVehicles([]);
  };

  const cancelVehicleEdit = () => {
    setEditingVehiclesUserId(null);
    setEditedVehicles([]);
  };

  return (
    <div className={`container ${styles.box}`} style={{ flexDirection: 'column', padding: '30px' }}>
      <div className={styles.logoCombined} style={{ marginBottom: '30px' }}>
        <span className={`material-icons ${styles.logo}`} style={{ fontSize: '100px' }}>group</span>
        <p className={styles.logoName}>Manage Users</p>
      </div>

      <div className={styles.form} style={{ width: '100%' }}>
        {users.map(user => (
          <div key={user._id} className="mb-4 p-4 border rounded">
            {editingUserId === user._id ? (
              <>
                <h2 className="text-white text-xl mb-4">Edit User Details</h2>

                <label className="text-white mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="mb-4 p-2 rounded"
                />

                <label className="text-white mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="mb-4 p-2 rounded"
                />

                <label className="text-white mb-2">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={editedUser.age}
                  onChange={handleInputChange}
                  className="mb-4 p-2 rounded"
                />

                <button
                  className={`bg-white text-black font-bold py-2 px-4 mt-4 rounded-full cursor-pointer ${styles.saveButton}`}
                  onClick={saveChanges}
                >
                  Save Changes
                </button>
                <button
                  className={`bg-red-500 text-white font-bold py-2 px-4 mt-4 rounded-full cursor-pointer ${styles.cancelButton}`}
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2 className="text-white text-xl mb-4">User Details</h2>
                <p className="text-white mb-4"><strong>Username:</strong> {user.username}</p>
                <p className="text-white mb-4"><strong>Email:</strong> {user.email}</p>
                <p className="text-white mb-4"><strong>Age:</strong> {user.age ? user.age : '-'}</p>

                <button
                  className={`bg-green-500 text-white font-bold py-2 px-4 mt-4 rounded-full cursor-pointer flex ${styles.editButton}`}
                  onClick={() => toggleEditVehicles(user)}
                >
                  Edit Vehicles
                </button>

                <button
                  className={`bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded-full cursor-pointer flex ${styles.editButton}`}
                  onClick={() => toggleEdit(user)}
                >
                  Edit User Information
                </button>
                <button
                  className={`bg-red-600 text-white font-bold py-2 px-4 mt-4 rounded-full cursor-pointer flex ${styles.deleteButton}`}
                  onClick={() => deleteUser(user._id)}
                >
                  Delete User
                </button>

                {user.vehicles?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-white">Vehicles:</h3>
                    {user.vehicles.map((vehicle, index) => (
                      <div key={index} className="mb-2 p-2 border rounded bg-gray-800 flex">
                        <p><strong>Nickname:</strong> {vehicle.nickname}</p>
                        <p><strong>Color:</strong> {vehicle.color}</p>
                        <p><strong>Year:</strong> {vehicle.year}</p>
                        <p><strong>Brand:</strong> {vehicle.brand}</p>
                        <p><strong>Model:</strong> {vehicle.model}</p>
                        <p><strong>Registration Country:</strong> {vehicle.registrationCountry}</p>
                        <p><strong>Plate Type:</strong> {vehicle.plateType}</p>
                        <p><strong>Owner's Full Name:</strong> {vehicle.ownerFullName}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {editingVehiclesUserId === user._id && (
              <>
                <h2 className="text-white text-xl mb-4">Edit Vehicles</h2>
                {editedVehicles.map((vehicle, index) => (
                  <div key={index} className="mb-4 p-4 border rounded bg-gray-700">
                    {['nickname','color','year','brand','model','registrationCountry','plateType','ownerFullName'].map((field) => (
                      <div key={field}>
                        <label className="text-white mb-2 flex">{field[0].toUpperCase() + field.slice(1)}:</label>
                        <input
                          type={field === 'year' ? 'number' : 'text'}
                          name={field}
                          value={vehicle[field]}
                          onChange={(e) => handleVehicleChange(index, e)}
                          className="mb-2 p-2 rounded flex"
                        />
                      </div>
                    ))}
                  </div>
                ))}
                <button
                  className={`bg-white text-black font-bold py-2 px-4 mt-4 rounded-full cursor-pointer flex ${styles.saveButton}`}
                  onClick={saveVehicleChanges}
                >
                  Save Vehicle Changes
                </button>
                <button
                  className={`bg-red-500 text-white font-bold py-2 px-4 mt-4 rounded-full cursor-pointer flex ${styles.cancelButton}`}
                  onClick={cancelVehicleEdit}
                >
                  Cancel Vehicle Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditUserAccounts;