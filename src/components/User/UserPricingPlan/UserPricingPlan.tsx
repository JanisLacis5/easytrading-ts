import {useAppSelector} from "../../../store/storeHooks"
import "./userpricingplan.css"
import {Link, useNavigate} from "react-router-dom"
import {useGlobalContext} from "../../../context/globalContext"
import {useEffect} from "react"

const UserPricingPlan = () => {
    const navigate = useNavigate()
    const {user} = useAppSelector((store) => store.user)
    const {changePlan, setChangePlan, setChoosePricing} = useGlobalContext()

    useEffect(() => {
        if (changePlan) {
            navigate("/pricing")
        }
    }, [changePlan])

    return (
        <div className="pricing-plan">
            <h2>
                Your current pricing plan: <span>{user.info.pricing}</span>
            </h2>
            <div>
                <Link
                    to="/pricing"
                    className={user.info.pricing === "pro" ? "pricing-pro" : ""}
                    onClick={() => {
                        setChangePlan(true)
                        setChoosePricing(true)
                    }}>
                    {user.info.pricing === "pro" ? "Change" : "Upgrade"}
                </Link>
                <Link to="/about">Read More</Link>
            </div>
        </div>
    )
}
export default UserPricingPlan
