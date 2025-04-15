import './authStyle.css';
import 'material-icons/iconfont/material-icons.css';
import { useState } from 'react';
function AuthenticationPage(){
    const [activeBtn, setActiveBtn] = useState('login');
    return(
        <div>    
            <div id="box" className="container">
                <div id="logoCombined">
                    <span id="logo" className="material-icons" >directions_car</span>
                    <p id="logoName">Car Services</p>
                </div>
                <span id="line"></span>
                <div className="form">
                    <div id="selection" className="flex rounded-full w-full">
                        <button className="flex-1 py-2 rounded-full"
                            style={activeBtn === 'login' ?{background: 'radial-gradient(at center, #0095FF 45%, #00FFCC 100%)'} : {}}
                            onClick={() => setActiveBtn('login')}
                        >Login</button>
                        <button class="flex-1 py-2 rounded-full"
                            style={activeBtn === 'signup' ?{background: 'radial-gradient(at center, #0095FF 45%, #00FFCC 100%)'} : {}}
                            onClick={() => setActiveBtn('signup')}
                        >Signup</button>
                    </div>
                    <div id="userInput"className="formInput">
                            <label for="username">
                                <span id="userIcon"class="input-icon material-icons">person</span>
                            </label>
                            <input id="username" type="text" className="inputField" placeholder="Username" required></input>
                    </div>
                    <div className="formInput">
                        <label for="password">
                            <span id="lockIcon"class="input-icon material-icons">lock</span>
                            </label>
                            <input id="password" type="password" className="inputField" placeholder="Password" required></input>
                    </div>
                    <a id="forgot"href="https://google.com">Forgot your password ?</a>
                    <button id="loginButton"className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full">
                        Login</button>
                </div>
            </div>
        </div>
    )
}
export default AuthenticationPage;