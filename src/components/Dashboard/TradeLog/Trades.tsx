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
                                <p>
                                    {screenWidth < 900 ? date.slice(5) : date}
                                </p>
                                <p>{time}</p>
                            </div>
                            <p>{stock.toUpperCase()}</p>
                            <p>${accBefore}</p>
                            <p>
                                $
                                {Number(accAfter) % 1 === 0
                                    ? Number(accAfter)
                                    : Number(accAfter).toFixed(2)}
                            </p>
                            <p
                                style={
                                    trade.pl > 0
                                        ? {color: "var(--color-trade-green)"}
                                        : {color: "var(--color-trade-red)"}
                                }>
                                {trade.pl > 0 ? "+" : "-"}$
                                {pl % 1 === 0 ? pl : pl.toFixed(2)}
                            </p>
                            <p>{action}</p>
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
