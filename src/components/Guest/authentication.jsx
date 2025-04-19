import styles from './authStyle.module.css';
import 'material-icons/iconfont/material-icons.css';
import { useState } from 'react';

function AuthenticationPage() {
    const [activeBtn, setActiveBtn] = useState('login');

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
                            required
                        />
                    </div>

                    {/* Email (only for signup) */}
                    {activeBtn === 'signup' && (
                        <div className={styles.formInput}>
                            <label htmlFor="email">
                                <span className={`input-icon material-icons ${styles.icon}`}>mail</span>
                            </label>
                            <input
                                id="email"
                                className={styles.input}
                                type="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                    )}

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
                            required
                        />
                    </div>

                    {/* Confirm Password (only for signup) */}
                    {activeBtn === 'signup' && (
                        <div className={styles.formInput}>
                            <label htmlFor="confirmPassword">
                                <span className={`input-icon material-icons ${styles.icon}`}>lock</span>
                            </label>
                            <input
                                id="confirmPassword"
                                className={styles.input}
                                type="password"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                    )}

                    {/* Login or Signup Button */}
                    {activeBtn === 'login' ? (
                        <>
                            <a href="https://google.com" className="text-white self-center mt-2 mb-2">Forgot your password?</a>
                            <button className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full cursor-pointer ${styles.loginButton}`}>
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
