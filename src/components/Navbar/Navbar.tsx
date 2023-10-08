import "./navbar.css"
import {useAppDispatch, useAppSelector} from "../../store/storeHooks"
import SmallNavbar from "./SmallNavbar"
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom"
import {setScreener, setTrading} from "../../features/navbarSlice"
import ScreenersBox from "./LinkBoxes/ScreenersBox"
import TradingBox from "./LinkBoxes/TradingBox"

const Navbar = () => {
    const dispatch = useAppDispatch()

    const {screenWidth} = useAppSelector((store) => store.default)
    const {screener, trading} = useAppSelector((store) => store.navbar)

    if (screenWidth < 900) {
        return <SmallNavbar />
    }

    return (
        <>
            <nav>
                <div className="nav-content">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="nav-links">
                        <Link to="/dashboard">
                            <p>Main</p>
                        </Link>
                        <div
                            onMouseEnter={() =>
                                dispatch(setTrading({value: true}))
                            }
                            onMouseLeave={() =>
                                dispatch(setTrading({value: false}))
                            }>
                            <p>Trading</p>
                            {trading && <div className="link-arrow"></div>}
                        </div>
                        <div
                            onMouseEnter={() =>
                                dispatch(setScreener({value: true}))
                            }
                            onMouseLeave={() =>
                                dispatch(setScreener({value: false}))
                            }>
                            <p>Screeners</p>
                            {screener && <div className="link-arrow"></div>}
                        </div>
                        <div>
                            <p>Chatrooms</p>
                        </div>
                    </div>
                    <button type="button" className="user">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={0.75}
                            stroke="currentColor"
                            className="w-6 h-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </button>
                </div>
            </nav>
            {screener && <ScreenersBox />}
            {trading && <TradingBox />}
        </>
    )
}
export default Navbar
