import {useDispatch, useSelector} from "react-redux"
import {Link, Outlet, useNavigate} from "react-router-dom"
import {useGlobalContext} from "../../context/globalContext"
import DeleteProfileModal from "../../components/User/UserDangerZone/DeleteProfileModal"
import {logout} from "../../features/userSlice"
import {RxHamburgerMenu} from "react-icons/rx"
import {useEffect, useState} from "react"
import {IoMdOpen} from "react-icons/io"
import UserMenu from "./UserMenu"
import {resetUserAside, toggleUserAside} from "../../features/smallSlice"

const UserPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((store) => store.user)
    const {showUserAside} = useSelector((store) => store.small)
    const {isDelete, screenWidth} = useGlobalContext()
    const info = user.info

    const logoutFunc = () => {
        dispatch(logout())
        navigate("/landing")
    }

    return (
        <div className="user-page">
            {isDelete && <DeleteProfileModal />}
            <div className="user-page-container">
                {screenWidth < 1200 ? (
                    <button
                        type="button"
                        className="burger-menu"
                        onClick={() => dispatch(toggleUserAside())}>
                        <RxHamburgerMenu size={20} />
                    </button>
                ) : (
                    <div></div>
                )}
                <div className="user-page-main-info">
                    <div className="user-page-image">
                        <img
                            src={info.image}
                            referrerPolicy="no-referrer"
                            alt="user profile picture"
                        />
                    </div>
                    <h2>
                        {info.firstName} {info.lastName}
                    </h2>
                    <h4>{info.email}</h4>
                </div>
                {screenWidth < 1200 ? (
                    showUserAside ? (
                        <aside className="user-page-aside-s">
                            <UserMenu />
                        </aside>
                    ) : (
                        <div className="user-page-content">
                            <Outlet />
                        </div>
                    )
                ) : (
                    <>
                        <aside className="user-page-aside">
                            <div className="user-page-link-container">
                                <Link to="/userpage">Update info</Link>
                                <Link to="/userpage/pricing">
                                    Pricing plans
                                </Link>
                                <Link to="/userpage/notes">Notes</Link>
                                <Link to="/userpage/danger">Danger zone</Link>
                            </div>
                            <div>
                                <button type="button" onClick={logoutFunc}>
                                    Logout
                                </button>
                            </div>
                        </aside>
                        <div className="user-page-content">
                            <Outlet />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default UserPage
