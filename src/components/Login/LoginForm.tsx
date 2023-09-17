import "./login.css"
import userIcon from "../../assets/user-icon.svg"
import passwordIcon from "../../assets/password-icon.svg"
import customFetch from "../../utils"
import {useState} from "react"
import md5 from "md5"
import {useAppDispatch, useAppSelector} from "../../store/storeHooks"
import {toast} from "react-toastify"
import {login, setIsLoading, setIsNotLoading} from "../../features/userSlice"
import {useNavigate} from "react-router-dom"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {isLoading} = useAppSelector((store) => store.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(setIsLoading())
        try {
            const {data} = await customFetch.post("/login", {
                email: email,
                password: md5(password),
            })
            localStorage.setItem("token", data.token)
            if (data.message === "incorrect password") {
                toast.error("Incorret password")
                dispatch(setIsNotLoading())
                setPassword("")
                return
            }
            if (data.message) {
                dispatch(setIsNotLoading())
                toast.error(data.message)
                return
            }
            dispatch(
                login({
                    id: data.id,
                    trades: data.trades,
                    info: data.info,
                    notes: data.notes,
                    layouts: data.layouts,
                })
            )
            navigate("/dashboard")
        } catch (error) {
            dispatch(setIsNotLoading())
            console.log(error)
        }
    }

    if (isLoading) {
        return <div className="loading"></div>
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input">
                <div className="login-icon">
                    <img src={userIcon} alt="icon" className="user-icon" />
                </div>
                <input
                    className="login-input-field"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="login-input">
                <div className="login-icon">
                    <img src={passwordIcon} alt="icon" className="user-icon" />
                </div>
                <input
                    className="login-input-field"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="login-button">
                Login
            </button>
        </form>
    )
}
export default LoginForm
