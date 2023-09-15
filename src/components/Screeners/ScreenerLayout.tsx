import {Outlet} from "react-router-dom"
import "./screeners.css"

const ScreenerLayout = () => {
    return (
        <section className="screeners">
            <Outlet />
        </section>
    )
}
export default ScreenerLayout
