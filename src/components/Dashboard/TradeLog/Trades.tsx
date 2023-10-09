import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import "./tradelog.css"
import {useEffect} from "react"
import {setSortedTrades} from "../../../features/sortSlice"
import {
    filterProducts,
    setFilteredProducts,
} from "../../../features/filterSlice"
import {IUserSingleTrade} from "../../../interfaces"

const Trades = ({trades}: {trades: IUserSingleTrade[]}) => {
    const dispatch = useAppDispatch()

    const {sortedTrades} = useAppSelector((store) => store.sort)
    const {user} = useAppSelector((store) => store.user)
    const {filters, filteredProducts} = useAppSelector((store) => store.filter)
    const {screenWidth} = useAppSelector((store) => store.default)

    useEffect(() => {
        dispatch(filterProducts({trades: sortedTrades}))
        dispatch(setSortedTrades({trades: filteredProducts}))
    }, [filters])

    useEffect(() => {
        dispatch(setSortedTrades({trades: user.trades}))
        dispatch(setFilteredProducts({trades: user.trades}))
    }, [user.trades])

    return (
        <>
            {trades && trades.length ? (
                trades.map((trade, index) => {
                    const pl = trade.pl < 0 ? trade.pl * -1 : trade.pl
                    const {date, time, stock, accBefore, accAfter, action} =
                        trade
                    return (
                        <div key={index} className="tradelog-trade-container">
                            <div className="tradelog-trade-time">
                                <h6>
                                    {screenWidth < 900 ? date.slice(5) : date}
                                </h6>
                                <h6>{time}</h6>
                            </div>
                            <h6>{stock.toUpperCase()}</h6>
                            <h6>${accBefore}</h6>
                            <h6>
                                $
                                {Number(accAfter) % 1 === 0
                                    ? Number(accAfter)
                                    : Number(accAfter).toFixed(2)}
                            </h6>
                            <h6
                                style={
                                    trade.pl > 0
                                        ? {color: "var(--green)"}
                                        : {color: "var(--red)"}
                                }>
                                {trade.pl > 0 ? "+" : "-"}$
                                {pl % 1 === 0 ? pl : pl.toFixed(2)}
                            </h6>
                            <h6>{action}</h6>
                        </div>
                    )
                })
            ) : (
                <h2 style={{textAlign: "center"}}>No data</h2>
            )}
        </>
    )
}
export default Trades
