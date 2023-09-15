import {useDispatch, useSelector} from "react-redux"
import "./aside.css"
import {toggleTrading} from "../../features/asideSlice"
import {Link} from "react-router-dom"
import {resetAside} from "../../features/smallSlice"
import {RxCross1} from "react-icons/rx"

const AsidePages = () => {
    const dispatch = useDispatch()
    const {tradingButton} = useSelector((store) => store.aside)
    return (
        <div className="small-aside-pages">
            <div>
                <button
                    className="dashboard-page"
                    type="button"
                    onClick={() => dispatch(toggleTrading())}>
                    Trading
                </button>
                <button type="button" onClick={() => dispatch(resetAside())}>
                    <RxCross1 size={20} />
                </button>
            </div>
            {!tradingButton && (
                <div>
                    <Link
                        className="secondary-link"
                        to="/dashboard/addtrade"
                        onClick={() => dispatch(resetAside())}>
                        Add Trade
                    </Link>
                    <Link
                        className="secondary-link"
                        to="/dashboard/calendar"
                        onClick={() => dispatch(resetAside())}>
                        Calendar
                    </Link>
                    <Link
                        className="secondary-link"
                        to="/dashboard/stats"
                        onClick={() => dispatch(resetAside())}>
                        Detailed stats
                    </Link>
                    <Link
                        className="secondary-link"
                        to="/dashboard/log"
                        onClick={() => dispatch(resetAside())}>
                        My Trades
                    </Link>
                    <Link
                        className="secondary-link"
                        to="/dashboard/notes"
                        onClick={() => dispatch(resetAside())}>
                        Notes
                    </Link>
                    <Link
                        className="secondary-link"
                        to="/dashboard/brokerlogin"
                        onClick={() => dispatch(resetAside())}>
                        Add Broker
                    </Link>
                </div>
            )}
            <button className="dashboard-page" type="button">
                Screeners
            </button>
            <button className="dashboard-page" type="button">
                Chatroom
            </button>
        </div>
    )
}
export default AsidePages
