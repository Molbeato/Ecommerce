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
    <div>
        <section>
            <p>Welcome! Please, enter your email and password to continue</p>
            <section>
                <h3>Test data</h3>
                <ul>
                    <li>
                        <em>Email</em>: test123@test.com
                    </li>
                    <li>
                        <em>Password</em>: test123
                    </li>
                </ul>
            </section>
            <LoginForm onLogin={handleLogin} />
        </section>

    { isLogged && <Navigate to={from ?? "/"} />}
    </div>
  )
}

export default Login
