import {Outlet} from "react-router-dom"
import Aside from "../Aside/Aside"
import {useAppSelector} from "../../store/storeHooks"
import "./dashboard.css"
import SmallAside from "../Aside/SmallAside"

const DashboardLayout = () => {
    const {isLoading} = useAppSelector((store) => store.user)
    const {showSmallAside} = useAppSelector((store) => store.small)
    const {screenWidth} = useAppSelector((store) => store.default)

    if (isLoading) {
        return <div className="loading"></div>
    }

    return (
        <section className="dashboard-page-1">
            {screenWidth < 900 ? <SmallAside /> : <Aside />}
            {!showSmallAside && <Outlet />}
        </section>
    )
}
export default DashboardLayout
