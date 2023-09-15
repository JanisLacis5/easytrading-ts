import {useDispatch, useSelector} from "react-redux"
import "./smalllink.css"
import {RxHamburgerMenu, RxCross1} from "react-icons/rx"
import {toggleSmallLinks} from "../../features/smallSlice"

const SmallNavbar = () => {
    const dispatch = useDispatch()
    const {showSmallLinks} = useSelector((store) => store.small)

    return (
        <nav className="small-nav">
            <div>
                <h1>
                    <span className="logo-easy">Easy</span>
                    <span className="logo-trading">Trading</span>
                </h1>
            </div>
            <button
                style={{color: "white", margin: "0"}}
                type="button"
                onClick={() => dispatch(toggleSmallLinks())}>
                {showSmallLinks ? (
                    <RxCross1 size={20} />
                ) : (
                    <RxHamburgerMenu size={20} />
                )}
            </button>
        </nav>
    )
}
export default SmallNavbar
