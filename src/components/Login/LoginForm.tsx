import "./login.css"
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
                    messages: data.messages,
                    recievedFriendRequests: data.recievedFriendRequests,
                    sentFriendRequests: data.sentFriendRequests,
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
                <input
                    className="login-input-field"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email" className={email ? "label-up" : ""}>
                    Email
                </label>
            </div>
            <div className="login-input">
                <input
                    className="login-input-field"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label
                    htmlFor="password"
                    className={password ? "label-up" : ""}>
                    Password
                </label>
            </div>
            <button type="submit" className="login-button">
                Login
            </button>
        </form>
    )
}
export default LoginForm
