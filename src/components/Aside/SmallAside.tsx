import {useAppDispatch, useAppSelector} from "../../store/storeHooks"
import "./aside.css"
import {IoMdOpen} from "react-icons/io"
import {toggleSmallAside} from "../../features/smallSlice"
import AsidePages from "./AsidePages"

const SmallAside = () => {
    const dispatch = useAppDispatch()
    const {showSmallAside} = useAppSelector((store) => store.small)

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
