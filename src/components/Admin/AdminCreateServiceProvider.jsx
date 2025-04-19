import styles from './createServiceProviderStyle.module.css';
import { useState } from 'react';

function AdminCreateServiceProvider() {
  const [form, setForm] = useState({
    name: '',
    companyType: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;
  
    if (!form.name || !form.companyType || !form.email || !form.phone) {
      alert('Please fill in all fields.');
      return;
    }
  
    if (!emailRegex.test(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    if (!phoneRegex.test(form.phone)) {
      alert('Phone number must contain digits only.');
      return;
    }
  
    setSubmitted(true);
  };
  

  return (
    <>
      <div className={`container ${styles.box}`} style={{ flexDirection: 'column', padding: '30px' }}>
      <div className={styles.logoCombined} style={{ marginBottom: '30px' }}>
        <span className={`material-icons ${styles.logo}`} style={{ fontSize: '100px' }}>business</span>
        <p className={styles.logoName}>Create Service Provider</p>
      </div>

      <div className={styles.form} style={{ width: '100%' }}>
        {submitted ? (
          <>
            <p className="text-white text-xl mb-4">✅ Service Provider Created Successfully!</p>
            <p className="text-white mb-2"><strong>Name:</strong> {form.name}</p>
            <p className="text-white mb-2"><strong>Type:</strong> {form.companyType}</p>
            <p className="text-white mb-2"><strong>Email:</strong> {form.email}</p>
            <p className="text-white mb-2"><strong>Phone:</strong> {form.phone}</p>
            <button
              className={`bg-white text-black font-bold py-2 px-4 mt-4 rounded-full cursor-pointer ${styles.backButton}`}
              onClick={() => {
                setForm({ name: '', companyType: '', email: '', phone: '' });
                setSubmitted(false);
              }}
            >
              Return to Create Page
            </button>
          </>
        ) : (
          <>
            <label className={styles.label}>Provider Name</label>
            <input className={styles.input} name="name" value={form.name} onChange={handleChange} />

            <label className={styles.label}>Company Type</label>
            <select
            className={styles.input}
            name="companyType"
            value={form.companyType}
            onChange={handleChange}
            >
            <option value="">Select Company Type</option>
            <option value="Insurance">Insurance</option>
            <option value="Violation Manager">Violation Manager</option>
            <option value="Toll Manager">Toll Manager</option>
            <option value="Parking Fee Manager">Parking Fee Manager</option>
            </select>


            <label className={styles.label}>Email</label>
            <input className={styles.input} name="email" type="email" value={form.email} onChange={handleChange} />

            <label className={styles.label}>Phone</label>
            <input className={styles.input} name="phone" type="tel" value={form.phone} onChange={handleChange} />

            <button
              className={`font-bold cursor-pointer ${styles.infoButton}`}
              onClick={handleSubmit}
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
    </>
  );
}

export default AdminCreateServiceProvider;
