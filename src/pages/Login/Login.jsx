import "./Login.css"

import LoginForm from '../../components/login/LoginForm/LoginForm'
import { useDispatch, useSelector } from "react-redux"
import { startSessionThunk } from "../../store/slices/authSlices"
import { Navigate, useLocation } from "react-router-dom"

const Login = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector((store) => store.auth.isLogged);
    const location = useLocation();

    const from = location.state?.from;
    
    const handleLogin = (loginData) => {
        dispatch(startSessionThunk(loginData))
    };

  return (
    <div className="login">
        <p className="welcome">Welcome! Please, enter your email and password to continue</p>
        <h3>Login info for preview</h3>
        <section className="login-info">
            
            <section>
                
                <div className="login-credentials">
                    <li>
                        <em>Email</em>: test123@test.com
                    </li>
                    <li>
                        <em>Password</em>: test123
                    </li>
                </div>
            </section>
            <LoginForm className="login-submit" onLogin={handleLogin} />
        </section>

    { isLogged && <Navigate to={from ?? "/"} />}
    </div>
  )
}

export default Login
