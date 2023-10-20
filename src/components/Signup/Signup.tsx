import {useEffect, useState} from "react"
import SignupForm from "./SignupForm"
import "./signup.css"
import {SlSocialGoogle, SlSocialFacebook} from "react-icons/sl"
import {useAppSelector} from "../../store/storeHooks"

const Signup = () => {
    const [signupBox, setSignupBox] = useState<Element | null>(null)
    const [pswdReqContainer, setPswdReqContainer] =
        useState<HTMLElement | null>(null)

    const {isMetReq, screenWidth} = useAppSelector((store) => store.default)

    const scrollToBottom = () => {
        if (signupBox) {
            setTimeout(() => {
                signupBox.scrollTo({
                    top: signupBox.scrollHeight,
                    left: 0,
                    behavior: "smooth",
                })
            }, 250)
        }
        return new Promise((resolve) => resolve("hello"))
    }

    useEffect(() => {
        if (!isMetReq && pswdReqContainer) {
            scrollToBottom()
                .then(() => {
                    pswdReqContainer.style.backgroundColor =
                        "rgba(218, 71, 58, 0.33)"
                })
                .catch((e) => console.log(e))
        }
        if (isMetReq && pswdReqContainer) {
            pswdReqContainer.style.backgroundColor = "transparent"
        }
    }, [isMetReq])

    useEffect(() => {
        setSignupBox(document.querySelector(".signup-box"))
        setPswdReqContainer(
            document.querySelector(".signup-requirements") as HTMLElement
        )
    }, [])

    return (
        <section className="signup-container">
            <div className="signup-box">
                <div className="signup-form-container">
                    <h3>Sign up</h3>
                    <SignupForm />
                </div>
                {screenWidth < 992 && (
                    <p>
                        <div></div>
                        or
                        <div></div>
                    </p>
                )}
                <div className="signup-social">
                    <div className="signup-social-buttons">
                        <button type="button">
                            <SlSocialGoogle />
                            {screenWidth < 1200 ? (
                                <h6>Sign up with google (recommended)</h6>
                            ) : (
                                <h5>Sign up with google (recommended)</h5>
                            )}
                        </button>
                        <button type="button">
                            <SlSocialFacebook />
                            {screenWidth < 1200 ? (
                                <h6>Sign up with facebook</h6>
                            ) : (
                                <h5>Sign up with facebook</h5>
                            )}
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
                {screenWidth > 1200 && (
                    <div className="signup-middle-line"></div>
                )}
            </div>
        </section>
    )
}

export default Signup
