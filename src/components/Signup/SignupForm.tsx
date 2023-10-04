import "./signup.css"
import "../Login/login.css"
import customFetch from "../../utils"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import {useAppSelector, useAppDispatch} from "../../store/storeHooks"
import {setIsLoading, setIsNotLoading} from "../../features/userSlice"
import {setDefaultStateBool} from "../../features/defaultSlice"
import {setUserInfoString} from "../../features/userInfoFormSlice"

const SignupForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {email, password, confirmPassword} = useAppSelector(
        (store) => store.userInfo
    )

    const {isMetReq} = useAppSelector((store) => store.default)
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

    // TODO: make error message if password doesnt meet requirements

    if (isLoading) {
        return <div className="loading"></div>
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-input">
                <input
                    type="email"
                    name="email"
                    id="email"
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
                <label htmlFor="email" className={email ? "label-up" : ""}>
                    Email
                </label>
            </div>
            <div className="signup-input">
                <input
                    type="password"
                    name="password"
                    id="password"
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
                <label
                    htmlFor="password"
                    className={password ? "label-up" : ""}>
                    Password
                </label>
            </div>
            <div className="signup-input">
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
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
                <label
                    htmlFor="confirmPassword"
                    className={confirmPassword ? "label-up" : ""}>
                    Confirm Password
                </label>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    )
}
export default SignupForm
