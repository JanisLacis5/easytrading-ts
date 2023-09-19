import userIcon from "../../../assets/user-icon.svg"
import "./signupinfoform.css"
import {login, setIsLoading, setIsNotLoading} from "../../../features/userSlice"
import customFetch from "../../../utils"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {useGlobalContext} from "../../../context/globalContext"
import md5 from "md5"
import {useAppDispatch} from "../../../store/storeHooks"

const SignupInfoForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        email,
        setEmail,
        password,
        setPassword,
        setConfirmPassword,
        choosePricing,
        setChoosePricing,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        username,
        setUsername,
        account,
        setAccount,
        image,
        setImage,
        pricingPlan,
    } = useGlobalContext()

    const temp = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tgt = e.target
        const files = tgt.files

        if (FileReader && files && files.length) {
            const fr = new FileReader()
            fr.onload = function () {
                setImage(fr.result)
            }
            fr.readAsDataURL(files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setIsLoading())
        if (!choosePricing) {
            setChoosePricing(true)
            navigate("/pricing")
            dispatch(setIsNotLoading())
            return
        }

        const {data} = await customFetch.post("/signup", {
            email: email,
            userData: {
                email,
                firstName,
                lastName,
                username,
                startingAccount: account,
                account,
                image,
                pricing: pricingPlan,
            },

            password: md5(password),
        })
        if (data.message !== "success") {
            dispatch(setIsNotLoading())
            toast.error(data.message)
            return
        }
        localStorage.setItem("token", data.token)
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setFirstName("")
        setLastName("")
        setUsername("")
        setAccount("")
        setImage(userIcon)
        setChoosePricing(false)
        dispatch(login({id: data.id, info: data.info}))
        toast.success("success")
        dispatch(setIsNotLoading())
        navigate("/dashboard")
    }

    return (
        <div className="signup-info-form">
            <h1> hello!</h1>
            <p>
                We need to collect simple information about the user so you can
                have better experience on our website.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="signup-info-form-profile-pic">
                    <h2>Profile picture (optional)</h2>
                    <div className="signup-info-form-profile-pic-input">
                        <input
                            onChange={temp}
                            type="file"
                            name="profilePic"
                            id="profilePic"
                            accept="image/*"
                        />
                        <label htmlFor="profilePic" id="outImage">
                            <img src={image} alt="profile picture" />
                        </label>
                    </div>
                    <p>
                        *for better image design it would be great to choose or
                        crop image with aspect ratio of 1:1
                    </p>
                </div>
                <div className="signup-info-form-input-container">
                    <div className="signup-info-form-field">
                        <div className="floating">
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text"
                                name="firstName"
                                id="firstName"
                            />
                            <label
                                className={firstName ? "label-up" : ""}
                                htmlFor="firstName">
                                First Name:{" "}
                            </label>
                        </div>
                    </div>
                    <div className="signup-info-form-field">
                        <div className="floating">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <label
                                className={lastName ? "label-up" : ""}
                                htmlFor="lastName">
                                Last Name:{" "}
                            </label>
                        </div>
                    </div>
                    <div className="signup-info-form-field">
                        <div className="floating">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label
                                className={username ? "label-up" : ""}
                                htmlFor="username">
                                Create Username:{" "}
                            </label>
                        </div>
                    </div>
                    <div className="signup-info-form-field">
                        <div className="floating">
                            <input
                                type="number"
                                name="account"
                                id="account"
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                            />
                            <label
                                className={account ? "label-up" : ""}
                                htmlFor="account">
                                Your Account Balance ($):{" "}
                            </label>
                        </div>
                    </div>
                    <div className="signup-info-form-field">
                        <button type="submit">Finish</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default SignupInfoForm
