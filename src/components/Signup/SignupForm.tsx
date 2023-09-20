import "./signup.css"
import "../Login/login.css"
import userIcon from "../../assets/user-icon.svg"
import infoIcon from "../../assets/info-icon.svg"
import passwordIcon from "../../assets/password-icon.svg"
import customFetch from "../../utils"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import {useAppSelector, useAppDispatch} from "../../store/storeHooks"
import {setIsLoading, setIsNotLoading} from "../../features/userSlice"
import {passwordRequirements} from "../../functions"
import {setDefaultStateBool} from "../../features/defaultSlice"
import {setUserInfoString} from "../../features/userInfoFormSlice"

const SignupForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {email, password, confirmPassword} = useAppSelector(
        (store) => store.userInfo
    )

    const {isRequirements, isMetReq} = useAppSelector((store) => store.default)
    const {isLoading} = useAppSelector((store) => store.user)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
                dispatch(setDefaultStateBool({prop: "isMetReq", value: true}))
                navigate("/signup/form")
            } else {
                dispatch(setIsNotLoading())
                toast.error(data.message)

                dispatch(setUserInfoString({prop: "email", value: ""}))
                dispatch(setUserInfoString({prop: "password", value: ""}))
                dispatch(
                    setUserInfoString({
                        prop: "confirmPassword",
                        value: "",
                    })
                )
            }
        } else {
            dispatch(setIsNotLoading())
            toast.error("Passwords do not match")

            dispatch(setUserInfoString({prop: "email", value: ""}))
            dispatch(setUserInfoString({prop: "password", value: ""}))
            dispatch(
                setUserInfoString({
                    prop: "confirmPassword",
                    value: "",
                })
            )
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
                    onChange={(e) =>
                        dispatch(
                            setUserInfoString({
                                prop: "email",
                                value: e.target.value,
                            })
                        )
                    }
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
                    onChange={(e) =>
                        dispatch(
                            setUserInfoString({
                                prop: "password",
                                value: e.target.value,
                            })
                        )
                    }
                    required
                />
                <img
                    src={infoIcon}
                    alt="info-icon"
                    className="info-icon"
                    onClick={() =>
                        dispatch(
                            setDefaultStateBool({
                                prop: "isRequirements",
                                value: !isRequirements,
                            })
                        )
                    }
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
                    onChange={(e) =>
                        dispatch(
                            setUserInfoString({
                                prop: "confirmPassword",
                                value: e.target.value,
                            })
                        )
                    }
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
