import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import "./user.css"
import {RxCross1} from "react-icons/rx"
import {Link} from "react-router-dom"
import {resetUserAside} from "../../features/smallSlice"

const UserMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutFunc = () => {
        dispatch(logout())
        navigate("/landing")
    }

    return (
        <>
            <div className="user-page-link-container">
                <button
                    type="button"
                    onClick={() => dispatch(resetUserAside())}>
                    <RxCross1 size={20} />
                </button>
                <Link to="/userpage" onClick={() => dispatch(resetUserAside())}>
                    Update info
                </Link>
                <Link
                    to="/userpage/pricing"
                    onClick={() => dispatch(resetUserAside())}>
                    Pricing plans
                </Link>
                <Link
                    to="/userpage/notes"
                    onClick={() => dispatch(resetUserAside())}>
                    Notes
                </Link>
                <Link
                    to="/userpage/danger"
                    onClick={() => dispatch(resetUserAside())}>
                    Danger zone
                </Link>
            </div>
            <div>
                <button type="button" onClick={logoutFunc}>
                    Logout
                </button>
            </div>
        </>
    )
}
export default UserMenu
