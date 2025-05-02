import styles from './authStyle.module.css';
import 'material-icons/iconfont/material-icons.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      navigate('/main');
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
          <form onSubmit={handleLogin}>
<div className={`flex rounded-full w-full ${styles.selection}`}>
                        <button
                            className="flex-1 py-2 rounded-full cursor-pointer"
                            style={{ background: 'radial-gradient(at center, #0095FF 40%, #00FFCC 95%)' }}
                        >Login</button>
                        <button
                            className="flex-1 py-2 rounded-full cursor-pointer"
                            onClick={() => navigate('/register')}
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

            {error && <p className={styles.error}>{error}</p>}

            <a href="#" className="text-white self-center mt-2 mb-2">Forgot your password?</a>

            <button
              type="submit"
              className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full cursor-pointer ${styles.loginButton} mt-4`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;