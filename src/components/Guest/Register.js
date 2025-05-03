import styles from './authStyle.module.css';
import 'material-icons/iconfont/material-icons.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.body}>
      <div className={`${styles.box} container`}>
        <div className={styles.logoCombined}>
          <span className={`material-icons ${styles.logo}`}>directions_car</span>
          <p className={styles.logoName}>Car Services</p>
        </div>

        <span className={styles.line}></span>

        <div className={styles.form}>
          <form onSubmit={handleRegister}>
<div className={`flex rounded-full w-full ${styles.selection}`}>
                        <button
                            className="flex-1 py-2 rounded-full cursor-pointer"
                            onClick={() => navigate('/login')}
                        >Login</button>
                        <button
                            className="flex-1 py-2 rounded-full cursor-pointer"
                            style={{ background: 'radial-gradient(at center, #0095FF 40%, #00FFCC 95%)' }}
                            >Signup</button>
                    </div>

            <div className={styles.formInput}>
              <label htmlFor="username">
                <span className={`material-icons ${styles.icon}`}>person</span>
              </label>
              <input
                id="username"
                className={`${styles.usernameInput} ${styles.input}`}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

<div className={styles.formInput}>
                                <label htmlFor="email">
                                    <span className={`material-icons ${styles.icon}`}>mail</span>
                                </label>
                                <input
                                    id="email"
                                    className={styles.input}
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

            <div className={styles.formInput}>
              <label htmlFor="password">
                <span className={`material-icons ${styles.icon}`}>lock</span>
              </label>
              <input
                id="password"
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.formInput}>
              <label htmlFor="confirmPassword">
                <span className={`material-icons ${styles.icon}`}>lock</span>
              </label>
              <input
                id="confirmPassword"
                className={styles.input}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button
              type="submit"
              className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full cursor-pointer ${styles.loginButton} mt-4`}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;