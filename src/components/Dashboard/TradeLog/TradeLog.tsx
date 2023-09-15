import "./tradelog.css"
import {useDispatch, useSelector} from "react-redux"
import Filters from "./Filters"
import Trades from "./Trades"
import {
    updateSort,
    sortTrades,
    setSortedTrades,
} from "../../../features/sortSlice"
import {toggleFilters} from "../../../features/filterSlice"
import {filterChart, profitsPerDate} from "../../../functions"
import {useEffect, useState} from "react"
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi"
import {useGlobalContext} from "../../../context/globalContext"
import Modal from "./Modal"

const TradeLog = () => {
    const dispatch = useDispatch()

    const [filter, setFilter] = useState("")

    const {sortedTrades, option, value} = useSelector((store) => store.sort)
    const {isFilters} = useSelector((store) => store.filter)
    const {user} = useSelector((store) => store.user)
    const {showModal, setShowModal} = useGlobalContext()

    useEffect(() => {
        dispatch(setSortedTrades({trades: user.trades}))
        profitsPerDate(user.trades)
    }, [user.trades])

    const handleChange = (e) => {
        dispatch(updateSort({name: e.target.name}))
        dispatch(sortTrades({trades: sortedTrades}))
    }

    const trades = filter ? filterChart(sortedTrades, filter) : sortedTrades

    return (
        <section className="tradelog">
            <h2 className="graph-title">Log</h2>
            <div className="tradelog-filter">
                <div>
                    <select
                        onChange={(e) => {
                            setFilter(e.target.value)
                        }}>
                        <option value="">All time</option>
                        <option value="day">Today</option>
                        <option value="week">This week</option>
                        <option value="month">This month</option>
                        <option value="year">This year</option>
                    </select>
                </div>
                <div>
                    <button
                        type="button"
                        className="tradelog-filter-removebtn"
                        onClick={() => {
                            setShowModal(true)
                        }}>
                        Remove all trades
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => dispatch(toggleFilters())}>
                        Filters
                    </button>
                </div>
            </div>
            <div className="tradelog-trades-header">
                {isFilters && <Filters />}
                <button type="button" name="date" onClick={handleChange}>
                    <span>Time </span>
                    <span>
                        {option === "date" ? (
                            value === null ? (
                                ""
                            ) : value ? (
                                <BiSolidDownArrow className="tradelog-trades-header-icon" />
                            ) : (
                                <BiSolidUpArrow className="tradelog-trades-header-icon" />
                            )
                        ) : (
                            ""
                        )}
                    </span>
                </button>
                <button type="button" name="stock" onClick={handleChange}>
                    <span>Stock</span>
                    <span>
                        {option === "stock" ? (
                            value ? (
                                <BiSolidDownArrow className="tradelog-trades-header-icon" />
                            ) : (
                                <BiSolidUpArrow className="tradelog-trades-header-icon" />
                            )
                        ) : (
                            ""
                        )}
                    </span>
                </button>
                <button type="button" name="accBefore" onClick={handleChange}>
                    <span>Before $</span>
                    <span>
                        {option === "accBefore" ? (
                            !value ? (
                                <BiSolidDownArrow className="tradelog-trades-header-icon" />
                            ) : (
                                <BiSolidUpArrow className="tradelog-trades-header-icon" />
                            )
                        ) : (
                            ""
                        )}
                    </span>
                </button>
                <button type="button" name="accAfter" onClick={handleChange}>
                    <span>After $</span>
                    <span>
                        {option === "accAfter" ? (
                            !value ? (
                                <BiSolidDownArrow className="tradelog-trades-header-icon" />
                            ) : (
                                <BiSolidUpArrow className="tradelog-trades-header-icon" />
                            )
                        ) : (
                            ""
                        )}
                    </span>
                </button>
                <button type="button" name="pl" onClick={handleChange}>
                    <span>P/L $</span>
                    <span>
                        {option === "pl" ? (
                            !value ? (
                                <BiSolidDownArrow className="tradelog-trades-header-icon" />
                            ) : (
                                <BiSolidUpArrow className="tradelog-trades-header-icon" />
                            )
                        ) : (
                            ""
                        )}
                    </span>
                </button>
                <button type="button" name="action" onClick={handleChange}>
                    <span>Action</span>
                    <span>
                        {option === "action" ? (
                            value ? (
                                <BiSolidDownArrow className="tradelog-trades-header-icon" />
                            ) : (
                                <BiSolidUpArrow className="tradelog-trades-header-icon" />
                            )
                        ) : (
                            ""
                        )}
                    </span>
                </button>
            </div>
            <div className="tradelog-trades">
                <Trades trades={trades} />
            </div>
            {showModal && <Modal />}
        </section>
    )
}

export default TradeLog
