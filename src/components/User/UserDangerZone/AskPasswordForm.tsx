import {useAppSelector, useAppDispatch} from "../../../store/storeHooks"
import {useGlobalContext} from "../../../context/globalContext"
import customFetch from "../../../utils"
import {useState} from "react"
import md5 from "md5"
import {logout} from "../../../features/userSlice"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

const AskPasswordForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {setIsDelete, setAskPassword} = useGlobalContext()
    const {user} = useAppSelector((store) => store.user)

    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {data} = await customFetch.patch("/deleteuser", {
            id: user.id,
            password: md5(password),
        })
        if (data.message === "success") {
            setPassword("")
            setAskPassword(false)
            setIsDelete(false)
            dispatch(logout())
            navigate("/landing")
        } else {
            setPassword("")
            toast.error(data.message)
        }
    }

    return (
        <form className="ask-password-form" onSubmit={handleSubmit}>
            <div className="ask-password-container">
                <label htmlFor="password">
                    Enter your password to delete your account
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="ask-password-button-container">
                    <div>
                        <button type="submit">Finish</button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsDelete(false)
                                setAskPassword(false)
                            }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default AskPasswordForm
