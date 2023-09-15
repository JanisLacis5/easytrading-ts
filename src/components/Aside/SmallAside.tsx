import {useDispatch, useSelector} from "react-redux"
import "./aside.css"
import {IoMdOpen} from "react-icons/io"
import {toggleSmallAside} from "../../features/smallSlice"
import AsidePages from "./AsidePages"

const SmallAside = () => {
    const dispatch = useDispatch()
    const {showSmallAside} = useSelector((store) => store.small)

    return (
        <aside
            className={
                showSmallAside
                    ? "dashboard-pages small-aside-big"
                    : "dashboard-pages"
            }>
            {showSmallAside ? (
                <AsidePages />
            ) : (
                <button
                    className="no-show-button"
                    type="button"
                    onClick={() => dispatch(toggleSmallAside())}>
                    <IoMdOpen size={20} />
                </button>
            )}
        </aside>
    )
}
export default SmallAside
