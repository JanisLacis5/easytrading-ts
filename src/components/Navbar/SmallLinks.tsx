import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../store/storeHooks"
import {reset, smallNav} from "../../features/smallSlice"
import "./smalllink.css"

const SmallLinks = () => {
    const dispatch = useAppDispatch()

    const {showTrading, showScreeners} = useAppSelector((store) => store.small)

    const onClickLink = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {}

    return (
        <div className="small-links">
            <div className="links">
                <div className="link" onClick={() => dispatch(reset())}>
                    <h4>Main</h4>
                </div>
                <div
                    className="link"
                    onClick={() => {
                        dispatch(smallNav({prop: "showTrading", value: true}))
                    }}>
                    <h4>Trading</h4>
                </div>
                {showTrading && (
                    <div className="show-trading">
                        <Link to="/dashboard/addtrade">New Trade</Link>
                        <Link to="/dashboard/log">Trade History</Link>
                        <Link to="/dasboard/notes">Notes</Link>
                        <Link to="/dashboard/stats">Detailed Stats</Link>
                        <Link to="/dashboard/calendar">Calendar</Link>
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
                        <Link to="/screeners">
                            <h5>Screener Layout</h5>
                        </Link>
                        <Link to="/gap">
                            <h5>Gap Screener</h5>
                        </Link>
                        <Link to="/hod">
                            <h5>High of Day Screener</h5>
                        </Link>
                    </div>
                )}
                <div className="link" onClick={() => dispatch(reset())}>
                    <h4>Chatroooms</h4>
                </div>
                <Link to="/user-page">
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
                    <div></div>
                </Link>
            </div>
        </div>
    )
}
export default SmallLinks
