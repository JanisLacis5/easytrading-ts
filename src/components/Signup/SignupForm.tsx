import "./signup.css"
import "../Login/login.css"
import userIcon from "../../assets/user-icon.svg"
import infoIcon from "../../assets/info-icon.svg"
import passwordIcon from "../../assets/password-icon.svg"
import customFetch from "../../utils"
import {toast} from "react-toastify"
import {useGlobalContext} from "../../context/globalContext"
import {useNavigate} from "react-router-dom"
import {useAppSelector, useAppDispatch} from "../../store/storeHooks"
import {setIsLoading, setIsNotLoading} from "../../features/userSlice"
import {passwordRequirements} from "../../functions"

const SignupForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
    } = useGlobalContext()

    const {isRequirements, setIsRequirements, isMetReq, setIsMetReq} =
        useGlobalContext()
    const {isLoading} = useAppSelector((store) => store.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            dispatch(setIsLoading())
            const {data} = await customFetch.post("/checkuser", {email: email})
            if (data.message === "success") {
                // if (!passwordRequirements(password)) {
                //     dispatch(setIsNotLoading())
                //     setIsMetReq(false)
                //     setPassword("")
                //     setConfirmPassword("")
                //     return
                // }
                dispatch(setIsNotLoading())
                setIsMetReq(true)
                navigate("/signup/form")
            } else {
                dispatch(setIsNotLoading())
                toast.error(data.message)
                setEmail("")
                setPassword("")
                setConfirmPassword("")
            }
        } else {
            dispatch(setIsNotLoading())
            toast.error("Passwords do not match")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        }
    }

    if (isLoading) {
        return <div className="loading"></div>
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-input">
                <div className="signup-icon">
                    <img src={userIcon} alt="icon" className="user-icon" />
                </div>
                <input
                    className="signup-input-field"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="signup-input">
                <div className="signup-icon">
                    <img src={passwordIcon} alt="icon" className="user-icon" />
                </div>
                <input
                    className="signup-input-field"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <img
                    src={infoIcon}
                    alt="info-icon"
                    className="info-icon"
                    onClick={() => setIsRequirements(!isRequirements)}
                />
                <h6
                    className={
                        isMetReq
                            ? "requirements-not-met"
                            : "requirements-not-met-show"
                    }>
                    Password does not meet the requirements (click on
                    <span>&#9432;</span>
                    button)
                </h6>
            </div>
            <div className="signup-input">
                <div className="signup-icon">
                    <img src={passwordIcon} alt="icon" className="user-icon" />
                </div>
                <input
                    className="signup-input-field"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="login-button">
                Sign Up
            </button>
        </form>
    )
}
export default SignupForm
