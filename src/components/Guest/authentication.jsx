import styles from './authStyle.module.css';
import 'material-icons/iconfont/material-icons.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for navigation

function AuthenticationPage({ onLogin }) {
    const [activeBtn, setActiveBtn] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Used for redirection after login

    // Handle login logic
    const handleLogin = async () => {
        try {
            const credentials = { username, password };
            const response = await axios.post('http://project.dubaisi.net/api/login', credentials);
            
            // Save the token to localStorage and update App.js state via onLogin
            localStorage.setItem('authToken', response.data.token);
            onLogin(response.data.token); // Pass the token back to App.js

            // After successful login, redirect to the dashboard
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            setErrorMessage('Invalid username or password');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className={styles.body}>
            <div id="box" className={`${styles.box} container`}>
                <div className={styles.logoCombined}>
                    <span className={`material-icons ${styles.logo}`}>directions_car</span>
                    <p className={styles.logoName}>Car Services</p>
                </div>

                <span className={styles.line}></span>

                <div className={styles.form}>
                    {/* Login/Signup Switch */}
                    <div className={`flex rounded-full w-full ${styles.selection}`}>
                        <button
                            className="flex-1 py-2 rounded-full antialiased subpixel-antialiased cursor-pointer"
                            style={activeBtn === 'login' ? { background: 'radial-gradient(at center, #0095FF 40%, #00FFCC 95%)' } : {}}
                            onClick={() => setActiveBtn('login')}
                        >Login</button>
                        <button
                            className="flex-1 py-2 rounded-full antialiased subpixel-antialiased cursor-pointer"
                            style={activeBtn === 'signup' ? { background: 'radial-gradient(at center, #0095FF 40%, #00FFCC 95%)' } : {}}
                            onClick={() => setActiveBtn('signup')}
                        >Signup</button>
                    </div>

                    {/* Username */}
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
                            onChange={(e) => setUsername(e.target.value)} // Capture username
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className={styles.formInput}>
                        <label htmlFor="password">
                            <span className={`input-icon material-icons ${styles.icon}`}>lock</span>
                        </label>
                        <input
                            id="password"
                            className={styles.input}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Capture password
                            required
                        />
                    </div>

                    {/* Error message */}
                    {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}

                    {/* Login or Signup Button */}
                    {activeBtn === 'login' ? (
                        <>
                            <a href="https://google.com" className="text-white self-center mt-2 mb-2">Forgot your password?</a>
                            <button 
                                className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full cursor-pointer ${styles.loginButton}`}
                                onClick={handleLogin} // Trigger the login function
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <button className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full cursor-pointer ${styles.loginButton} mt-6`}>
                            Create Account
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
export default AuthenticationPage;