import styles from './authStyle.module.css';
import 'material-icons/iconfont/material-icons.css';
import { useState } from 'react';
function AuthenticationPage(){
    const [activeBtn, setActiveBtn] = useState('login');
    return(
        <div>    
            <div id="box" className={`${styles.box} container`}>
                <div className={styles.logoCombined}>
                    <span className={`material-icons ${styles.logo}`} >directions_car</span>
                    <p className={styles.logoName}>Car Services</p>
                </div>
                <span className={styles.line}></span>
                <div className={styles.form}>
                    <div className={`flex rounded-full w-full ${styles.selection}`}>
                        <button className="flex-1 py-2 rounded-full antialiased subpixel-antialiased cursor-pointer"
                            style={activeBtn === 'login' ?{background: 'radial-gradient(at center, #0095FF 40%, #00FFCC 95%)'} : {}}
                            onClick={() => setActiveBtn('login')}
                        >Login</button>
                        <button className="flex-1 py-2 rounded-full antialiased subpixel-antialiased cursor-pointer"
                            style={activeBtn === 'signup' ?{background: 'radial-gradient(at center, #0095FF 40%, #00FFCC 95%)'} : {}}
                            onClick={() => setActiveBtn('signup')}
                        >Signup</button>
                    </div>
                    <div className={styles.formInput}>
                                <label for="username">
                                <span id="userIcon"className="input-icon material-icons">person</span>
                            </label>
                            <input id="username" className={styles.usernameInput}type="text" placeholder="Username" required></input>
                    </div>
                    <div className={styles.formInput}>
                        <label for="password">
                            <span id="lockIcon"class="input-icon material-icons">lock</span>
                            </label>
                            <input id="password" type="password" placeholder="Password" required></input>
                    </div>
                    <a href="https://google.com">Forgot your password ?</a>
                    <button id="loginButton"className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full cursor-pointer ${styles.loginButton}`}> 
                    Login</button>
                </div>
            </div>
        </div>
    )
}
export default AuthenticationPage;