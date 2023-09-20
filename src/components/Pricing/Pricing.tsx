import {useNavigate} from "react-router-dom"
import "./pricing.css"
import {toast} from "react-toastify"
import customFetch from "../../utils"
import {login, setIsLoading, setIsNotLoading} from "../../features/userSlice"
import {useAppDispatch, useAppSelector} from "../../store/storeHooks"
import md5 from "md5"
import userIcon from "../../assets/user-icon.svg"
import {useEffect} from "react"
import {
    setUserInfoBool,
    setUserInfoString,
} from "../../features/userInfoFormSlice"

const Pricing = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {user} = useAppSelector((store) => store.user)

    const {
        choosePricing,
        email,
        firstName,
        lastName,
        username,
        account,
        image,
        password,
        pricingPlan,
        changePlan,
    } = useAppSelector((store) => store.userInfo)

    const handleSubmit = async () => {
        if (!choosePricing) {
            setUserInfoBool({prop: "choosePricing", value: true})
            navigate("/signup")
            return
        }

        dispatch(setIsLoading())

        if (changePlan) {
            if (pricingPlan === user.info.pricing) {
                toast.success("This is your current plan")
                dispatch(setIsNotLoading())
                dispatch(setUserInfoBool({prop: "changePlan", value: false}))
                dispatch(setUserInfoBool({prop: "choosePricing", value: false}))
                dispatch(setUserInfoString({prop: "pricingPlan", value: ""}))
                navigate("/dashboard")
                return
            }
            const {data} = await customFetch.post("/changeplan", {
                plan: pricingPlan,
                id: user.id,
            })
            dispatch(
                login({
                    id: user.id,
                    info: data.info,
                    trades: user.trades,
                    layouts: user.layouts,
                    notes: user.notes,
                })
            )
            dispatch(setIsNotLoading())
            toast.success(
                `Plan succesfully updated to "${`${data.info.pricing.toUpperCase()}`}"`
            )
            dispatch(setUserInfoBool({prop: "changePlan", value: false}))
            dispatch(setUserInfoBool({prop: "choosePricing", value: false}))
            dispatch(setUserInfoString({prop: "pricingPlan", value: ""}))
            navigate("/dashboard")
            return
        }

        const {data} = await customFetch.post("/signup", {
            email: email,
            userData: {
                email: email,
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
            setUserInfoString({prop: "email", value: ""})
            setUserInfoString({prop: "password", value: ""})
            setUserInfoString({prop: "confirmPassword", value: ""})
            toast.error(data.message)
            return
        }
        localStorage.setItem("token", data.token)

        dispatch(setUserInfoString({prop: "email", value: ""}))
        dispatch(setUserInfoString({prop: "password", value: ""}))
        dispatch(setUserInfoString({prop: "confirmPassword", value: ""}))
        dispatch(setUserInfoString({prop: "firstName", value: ""}))
        dispatch(setUserInfoString({prop: "lastName", value: ""}))
        dispatch(setUserInfoString({prop: "username", value: ""}))
        dispatch(setUserInfoString({prop: "account", value: ""}))
        dispatch(setUserInfoString({prop: "image", value: userIcon}))
        dispatch(setUserInfoBool({prop: "choosePricing", value: false}))
        dispatch(setUserInfoString({prop: "pricingPlan", value: ""}))

        dispatch(login({id: data.id, info: data.info}))
        toast.success("success")
        dispatch(setIsNotLoading())
        navigate("/dashboard")
    }

    useEffect(() => {
        if (pricingPlan) {
            handleSubmit()
        }
    }, [pricingPlan])

    return (
        <section className="card-page">
            <div className="card-container">
                <div className="card">
                    <h2 className="card-title">Free</h2>
                    <div className="features">
                        <h3 className="feature">Access to trading tracker</h3>
                        <h3 className="feature">Add up to 20 trades per day</h3>
                        <h3 className="feature">24/7 support</h3>
                    </div>{" "}
                    <div className="price">
                        <button
                            type="button"
                            className="price-button"
                            value="free"
                            onClick={(e) =>
                                dispatch(
                                    setUserInfoString({
                                        prop: "pricingPlan",
                                        value: (e.target as HTMLButtonElement)
                                            .value,
                                    })
                                )
                            }>
                            Start free
                        </button>
                    </div>
                </div>
                <div className="card">
                    <h2 className="card-title">Basic</h2>
                    <div className="features">
                        <h3 className="feature">Access to basic screeners</h3>
                        <h3 className="feature">Unlimited trades per day</h3>
                        <h3 className="feature">7 day free trial</h3>
                    </div>
                    <div className="price">
                        <button
                            type="button"
                            className="price-button"
                            value="basic"
                            onClick={(e) =>
                                dispatch(
                                    setUserInfoString({
                                        prop: "pricingPlan",
                                        value: (e.target as HTMLButtonElement)
                                            .value,
                                    })
                                )
                            }>
                            10.00 $/month
                        </button>
                    </div>
                </div>
                <div className="card">
                    <h2 className="card-title">Pro</h2>
                    <div className="features">
                        <h3 className="feature">Access to every tool</h3>
                        <h3 className="feature">
                            Access to community chatroom
                        </h3>
                        <h3 className="feature">Watch my trading streams</h3>
                    </div>
                    <div className="price">
                        <button
                            type="button"
                            className="price-button"
                            value="pro"
                            onClick={(e) =>
                                dispatch(
                                    setUserInfoString({
                                        prop: "pricingPlan",
                                        value: (e.target as HTMLButtonElement)
                                            .value,
                                    })
                                )
                            }>
                            35.00 $/month
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Pricing
