import {Link} from "react-router-dom"
import "./navbar.css"
import {useAppSelector} from "../../store/storeHooks"
import UserButton from "../User/UserButton"
import SmallNavbar from "./SmallNavbar"
import {useGlobalContext} from "../../context/globalContext"

const Navbar = () => {
    const {isLogged} = useAppSelector((store) => store.user)

    const {screenWidth} = useGlobalContext()

    if (screenWidth < 900) {
        return <SmallNavbar />
    }

    return (
        <nav>
            <div className="logo">
                <h1>
                    <span className="logo-easy">Easy</span>
                    <span className="logo-trading">Trading</span>
                </h1>
            </div>
            <div className="links">
                <Link
                    className="link"
                    to={isLogged ? "/dashboard" : "/landing"}>
                    {isLogged ? "Dashboard" : "Landing"}
                </Link>
                <Link className="link" to="/about">
                    About
                </Link>
                <Link className="link" to="/pricing">
                    Pricing
                </Link>
                <Link className="link" to="/contact">
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
        </nav>
    )
}
export default Navbar
