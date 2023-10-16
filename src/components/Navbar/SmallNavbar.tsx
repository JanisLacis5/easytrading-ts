import {useAppDispatch, useAppSelector} from "../../store/storeHooks"
import "./smalllink.css"
import {RxHamburgerMenu, RxCross1} from "react-icons/rx"
import {reset, toggleSmallLinks} from "../../features/smallSlice"
import logo from "../../assets/logo.png"

const SmallNavbar = () => {
    const dispatch = useAppDispatch()
    const {showSmallLinks} = useAppSelector((store) => store.small)

    return (
        <nav
            className="small-nav"
            style={{boxShadow: "0 2px 5px var(--black-10)"}}>
            <div>
                <img src={logo} alt="logo" />
            </div>
            {showSmallLinks ? (
                <button type="button" onClick={() => dispatch(reset())}>
                    <RxCross1 size={20} />
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => dispatch(toggleSmallLinks())}>
                    <RxHamburgerMenu size={20} />
                </button>
            )}
        </nav>
    )
}
export default SmallNavbar
