import SignupForm from "./SignupForm"
import "./signup.css"
import {SlSocialGoogle, SlSocialFacebook} from "react-icons/sl"

const Signup = () => {
    return (
        <section className="signup-container">
            <div className="signup-box">
                <div className="signup-social">
                    <div className="signup-social-buttons">
                        <button type="button">
                            <SlSocialGoogle />
                            <p>Sign up with google (recommended)</p>
                        </button>
                        <button type="button">
                            <SlSocialFacebook />
                            <p>Sign up with facebook</p>
                        </button>
                    </div>
                    <div className="signup-requirements">
                        <h6>Passsword requirements (for sign up form)</h6>
                        <ul>
                            <li>
                                <p>8 characters</p>
                            </li>
                            <li>
                                <p>1 capital letter</p>
                            </li>
                            <li>
                                <p>1 lowercase letter</p>
                            </li>
                            <li>
                                <p>1 symbol</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="signup-middle-line"></div>
                <div className="signup-form-container">
                    <h3>Sign up</h3>
                    <SignupForm />
                </div>
            </div>
        </section>
    )
}

export default Signup
