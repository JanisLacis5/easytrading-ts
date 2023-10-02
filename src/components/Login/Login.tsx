import "./login.css"
import {SlSocialGoogle, SlSocialFacebook} from "react-icons/sl"
import LoginForm from "./LoginForm"

const Login = () => {
    return (
        <section className="card-page">
            <div className="login-box">
                <div className="login-title">
                    <h4>Sign in</h4>
                </div>
                <LoginForm />
                <div className="social-login">
                    <p>or</p>
                    <div className="social-login-buttons">
                        <a
                            href="http://localhost:3000/auth/google"
                            className="social-button"
                            role="button">
                            <SlSocialGoogle className="social-icon" />
                        </a>
                        <a
                            href="http://localhost:3000/auth/facebook"
                            className="social-button"
                            role="button">
                            <SlSocialFacebook className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
