import './authStyle.css';
import 'material-icons/iconfont/material-icons.css';
function AuthenticationPage(){
    return(
        <div>
            <div id="box">
                <div id="logoContainer">
                    <div id="logoCombined">
                        <span id="logo" className="material-icons" >directions_car</span>
                        <p id="logoName">Car Services</p>
                    </div>
                </div>
                <div className="form">
                    <div className="formInput">
                            <span id="userIcon"class="input-icon material-icons">person</span>
                            <input type="text" className="inputField" placeholder="Username" required></input>
                    </div>

                    <div className="formInput">
                            <span id="lockIcon"class="input-icon material-icons">lock</span>
                            <input type="password" className="inputField" placeholder="Password" required></input>
                    </div>
                    <a href="https://google.com">Forgot your password ?</a>
                    <button>Login</button>
                </div>
            </div>
        </div>
    )
}
export default AuthenticationPage;