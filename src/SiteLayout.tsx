import {Link, Outlet, useNavigate} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import {useEffect} from "react"
import {useAppDispatch} from "./store/storeHooks"
import {resetLinks} from "./features/smallSlice"
import "./components/Navbar/smalllink.css"
import UserButton from "./components/User/UserButton"
import {useAppSelector} from "./store/storeHooks"
import {setWidth} from "./features/defaultSlice"

const SiteLayout = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {isLogged} = useAppSelector((store) => store.user)
    const {showSmallLinks} = useAppSelector((store) => store.small)
    const {screenWidth} = useAppSelector((store) => store.default)

    useEffect(() => {
        window.onresize = () => dispatch(setWidth(window.innerWidth))
    }, [])

    useEffect(() => {
        if (screenWidth > 900) {
            dispatch(resetLinks())
        }
    }, [screenWidth])

    useEffect(() => {
        if (window.location.pathname === "/screeners/hod") {
            return
        }
        if (window.location.pathname !== "/loading") {
            const currentPage = sessionStorage.getItem("currentPage")
            if (isLogged) {
                if (currentPage && currentPage !== "/landing") {
                    navigate(currentPage)
                } else {
                    navigate("/dashboard")
                }
            } else {
                navigate("/landing")
            }
        } else {
            navigate("/dashboard")
        }
    }, [])

    useEffect(() => {
        const handleBeforeUnload = () => {
            sessionStorage.setItem("currentPage", window.location.pathname)
        }
        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [])

    return (
        <main>
            {window.location.pathname !== "/landing" &&
                window.location.pathname !== "/login" && <Navbar />}
            {showSmallLinks ? (
                <div className="small-links">
                    <div className="links">
                        <Link
                            className="link"
                            to={isLogged ? "/dashboard" : "/landing"}
                            onClick={() => dispatch(resetLinks())}>
                            {isLogged ? "Dashboard" : "Landing"}
                        </Link>
                        <Link
                            className="link"
                            to="/about"
                            onClick={() => dispatch(resetLinks())}>
                            About
                        </Link>
                        <Link
                            className="link"
                            to="/pricing"
                            onClick={() => dispatch(resetLinks())}>
                            Pricing
                        </Link>
                        <Link
                            className="link"
                            to="/contact"
                            onClick={() => dispatch(resetLinks())}>
                            Contact
                        </Link>
                    </div>
                    <div className="login">
                        {!isLogged && (
                            <Link className="signup-btn" to="/signup">
                                Sign up
                            </Link>
                        )}
                        {isLogged ? (
                            <UserButton />
                        ) : (
                            <Link className="login-btn" to="/login">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </main>
    )
}
export default SiteLayout
