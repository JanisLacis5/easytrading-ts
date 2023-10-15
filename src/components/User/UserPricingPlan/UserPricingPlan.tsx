import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import "./userpricingplan.css"
import {Link, useNavigate} from "react-router-dom"
import {useEffect} from "react"
import {setUserInfoBool} from "../../../features/userInfoFormSlice"

const UserPricingPlan = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {user} = useAppSelector((store) => store.user)
    const {changePlan} = useAppSelector((store) => store.userInfo)
    const {screenWidth} = useAppSelector((store) => store.default)

    useEffect(() => {
        if (changePlan) {
            navigate("/pricing")
        }
    }, [changePlan])

    return (
        <div className="pricing-plan">
            {screenWidth < 576 ? (
                <h4>
                    Your current pricing plan: <br />{" "}
                    <span>{user.info.pricing}</span>
                </h4>
            ) : (
                <h3>
                    Your current pricing plan: <br />{" "}
                    <span>{user.info.pricing}</span>
                </h3>
            )}
            <div>
                <Link
                    to="/pricing"
                    className={user.info.pricing === "pro" ? "pricing-pro" : ""}
                    onClick={() => {
                        dispatch(
                            setUserInfoBool({prop: "changePlan", value: true})
                        )
                        dispatch(
                            setUserInfoBool({
                                prop: "choosePricing",
                                value: true,
                            })
                        )
                    }}>
                    {user.info.pricing === "pro" ? "Change" : "Upgrade"}
                </Link>
                <Link to="/about">Read More</Link>
            </div>
        </div>
    )
}
export default UserPricingPlan
