import {useAppDispatch, useAppSelector} from "../../store/storeHooks"
import "./aside.css"
import {toggleTrading, toggleScreeners} from "../../features/asideSlice"
import {Link} from "react-router-dom"

const Aside = () => {
    const dispatch = useAppDispatch()
    const {tradingButton, screenersButton} = useAppSelector(
        (store) => store.aside
    )

    return (
        <aside className="dashboard-pages">
            <button
                className="dashboard-page"
                type="button"
                onClick={() => dispatch(toggleTrading())}>
                Trading
            </button>
            {tradingButton && (
                <div>
                    <Link className="secondary-link" to="/dashboard/addtrade">
                        Add Trade
                    </Link>
                    <Link className="secondary-link" to="/dashboard/calendar">
                        Calendar
                    </Link>
                    <Link className="secondary-link" to="/dashboard/stats">
                        Detailed stats
                    </Link>
                    <Link className="secondary-link" to="/dashboard/log">
                        My Trades
                    </Link>
                    <Link className="secondary-link" to="/dashboard/notes">
                        Notes
                    </Link>
                    <Link
                        className="secondary-link"
                        to="/dashboard/brokerlogin">
                        Add Broker
                    </Link>
                </div>
            )}
            <button
                className="dashboard-page"
                type="button"
                onClick={() => dispatch(toggleScreeners())}>
                Screeners
            </button>
            {screenersButton && (
                <div>
                    <Link className="secondary-link" to="/screeners">
                        My layout
                    </Link>
                    <Link
                        className="secondary-link"
                        to="/screeners/hod"
                        target="_blank">
                        Hod screener
                    </Link>
                </div>
            )}
            <button className="dashboard-page" type="button">
                Chatroom
            </button>
        </aside>
    )
}
export default Aside
