import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../store/storeHooks"
import {reset, smallNav} from "../../features/smallSlice"
import "./smalllink.css"

const SmallLinks = () => {
    const dispatch = useAppDispatch()

    const {showTrading, showScreeners} = useAppSelector((store) => store.small)
    const {user} = useAppSelector((store) => store.user)

    return (
        <div className="small-links">
            <div className="links">
                <Link
                    to="/dashboard"
                    className="link"
                    onClick={() => dispatch(reset())}>
                    <h4>Main</h4>
                </Link>
                <div
                    className="link"
                    onClick={() => {
                        dispatch(smallNav({prop: "showTrading", value: true}))
                    }}>
                    <h4>Trading</h4>
                </div>
                {showTrading && (
                    <div className="show-trading">
                        <Link
                            to="/dashboard/addtrade"
                            onClick={() => dispatch(reset())}>
                            New Trade
                        </Link>
                        <Link
                            to="/dashboard/log"
                            onClick={() => dispatch(reset())}>
                            Trade History
                        </Link>
                        <Link
                            to="/dasboard/notes"
                            onClick={() => dispatch(reset())}>
                            Notes
                        </Link>
                        <Link
                            to="/dashboard/stats"
                            onClick={() => dispatch(reset())}>
                            Detailed Stats
                        </Link>
                        <Link
                            to="/dashboard/calendar"
                            onClick={() => dispatch(reset())}>
                            Calendar
                        </Link>
                    </div>
                )}
                <div
                    className="link"
                    onClick={() => {
                        dispatch(smallNav({prop: "showScreeners", value: true}))
                    }}>
                    <h4>Screeners</h4>
                </div>
                {showScreeners && (
                    <div className="show-screeners">
                        <Link to="/screeners" onClick={() => dispatch(reset())}>
                            <h5>Screener Layout</h5>
                        </Link>
                        <Link
                            to="/gap"
                            target="_blank"
                            onClick={() => dispatch(reset())}>
                            <h5>Gap Screener</h5>
                        </Link>
                        <Link
                            to="/hod"
                            target="_blank"
                            onClick={() => dispatch(reset())}>
                            <h5>High of Day Screener</h5>
                        </Link>
                    </div>
                )}
                <div className="link" onClick={() => dispatch(reset())}>
                    <h4>Chatroooms</h4>
                </div>
                <Link to="/user-page" onClick={() => dispatch(reset())}>
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
                    <div>
                        <h4>{user.info.username}</h4>
                        <h6>{`$${Number(user.info.account).toFixed(2)}`}</h6>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default SmallLinks
