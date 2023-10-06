import {Outlet} from "react-router-dom"
import {useAppSelector} from "../../store/storeHooks"
import "./dashboard.css"

const DashboardLayout = () => {
    const {isLoading} = useAppSelector((store) => store.user)

    if (isLoading) {
        return <div className="loading"></div>
    }

    return (
        <section className="dashboard-page-1">
            <Outlet />
        </section>
    )
}
export default DashboardLayout
