import "./tradelog.css"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
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
import Modal from "./Modal"
import {setDefaultStateBool} from "../../../features/defaultSlice"
import {OpUnitType} from "dayjs"

const TradeLog = () => {
    const dispatch = useAppDispatch()

    const [filter, setFilter] = useState<OpUnitType>()

    const {sortedTrades, option, value} = useAppSelector((store) => store.sort)
    const {isFilters} = useAppSelector((store) => store.filter)
    const {user} = useAppSelector((store) => store.user)
    const {showModal, screenWidth} = useAppSelector((store) => store.default)

    useEffect(() => {
        dispatch(setSortedTrades({trades: user.trades}))
        profitsPerDate(user.trades)
    }, [user.trades])

    const handleChange = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        dispatch(
            updateSort({
                name: (e.target as HTMLButtonElement).name as
                    | "stock"
                    | "accBefore"
                    | "accAfter"
                    | "pl"
                    | "date"
                    | "time"
                    | "action",
            })
        )
        dispatch(sortTrades({trades: sortedTrades}))
    }

    const trades = filter ? filterChart(sortedTrades, filter) : sortedTrades

    return (
        <section className="tradelog">
            <h3>Log</h3>
            <div className="tradelog-filter">
                <select
                    onChange={(e) => {
                        setFilter(e.target.value as OpUnitType)
                    }}>
                    <option value="">All time</option>
                    <option value="day">Today</option>
                    <option value="week">This week</option>
                    <option value="month">This month</option>
                    <option value="year">This year</option>
                </select>
                <button
                    type="button"
                    className="tradelog-filter-removebtn"
                    onClick={() => {
                        dispatch(
                            setDefaultStateBool({
                                prop: "showModal",
                                value: true,
                            })
                        )
                    }}>
                    {screenWidth < 768 ? (
                        <h5>Remove all</h5>
                    ) : (
                        <h5>Remove all trades</h5>
                    )}
                </button>
                <button type="button" onClick={() => dispatch(toggleFilters())}>
                    <h5>Filters</h5>
                </button>
            </div>
            <div className="tradelog-trades-header">
                {isFilters && <Filters />}
                <button type="button" name="date" onClick={handleChange}>
                    <span>
                        <h5>Time</h5>
                    </span>
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
                    <span>
                        <h5>Stock</h5>
                    </span>
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
                    <span>
                        {screenWidth < 768 ? (
                            <h5>Before</h5>
                        ) : (
                            <h5>Before $</h5>
                        )}
                    </span>
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
                    <span>
                        {screenWidth < 768 ? <h5>After</h5> : <h5>After $</h5>}
                    </span>
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
                    <span>
                        <h5>P/L $</h5>
                    </span>
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
                    <span>
                        <h5>Action</h5>
                    </span>
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
