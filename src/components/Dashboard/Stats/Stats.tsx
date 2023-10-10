import {useAppSelector} from "../../../store/storeHooks"
import "../dashboard.css"
import "./stats.css"
import {useEffect, useState} from "react"
import {lostPl, wonPl} from "./statsFunc"
import {countStats} from "../../../functions"

interface IWonPl {
    averageWonDayPl: number
    maxWonDayPl: number
    biggestWin: number
    wonDays: number
}

interface ILostPl {
    averageLostDayPl: number
    biggestLostDayPl: number
    biggestLoss: number
    lostDays: number
}

interface ICountStats {
    wonTrades: number
    lostTrades: number
    totalProfit: number
}

const Stats = () => {
    const [wonPlState, setWonPlState] = useState<IWonPl>({
        averageWonDayPl: 0,
        maxWonDayPl: 0,
        biggestWin: 0,
        wonDays: 0,
    })
    const [lostPlState, setLostPlState] = useState<ILostPl>({
        averageLostDayPl: 0,
        biggestLostDayPl: 0,
        biggestLoss: 0,
        lostDays: 0,
    })
    const [countSt, setCountSt] = useState<ICountStats>({
        wonTrades: 0,
        lostTrades: 0,
        totalProfit: 0,
    })
    const {user} = useAppSelector((store) => store.user)

    useEffect(() => {
        if (user.trades) {
            setLostPlState(lostPl(user.trades))
            setWonPlState(wonPl(user.trades))
            setCountSt(countStats(user.trades))
        }
    }, [user.trades])

    return (
        <div className="detailed-stats">
            <h3>Statistics</h3>
            <div className="detailed-stats-table">
                <div>
                    <div>
                        <span>Your starting account balance: </span>
                        <span>${user.info.startingAccount}</span>
                    </div>
                    <div>
                        <span>Account P/L (%):</span>
                        <span
                            style={{
                                color:
                                    countSt?.totalProfit === 0
                                        ? "var(--color-grey-300)"
                                        : countSt.totalProfit > 0
                                        ? "var(--color-trade-green)"
                                        : "var(--color-trade-red)",
                            }}>
                            {(
                                (countSt.totalProfit /
                                    Number(user.info.startingAccount)) *
                                100
                            ).toFixed(0)}
                            %
                        </span>
                    </div>
                    <div>
                        <span>Average won day P/L: </span>
                        <span
                            style={{
                                color:
                                    wonPlState.averageWonDayPl === 0
                                        ? "var(--color-grey-300)"
                                        : "var(--color-trade-green)",
                            }}>
                            {wonPlState.averageWonDayPl >= 0
                                ? `$${wonPlState.averageWonDayPl.toFixed(2)}`
                                : `-$${(
                                      wonPlState.averageWonDayPl * -1
                                  ).toFixed(2)}`}
                        </span>
                    </div>

                    <div>
                        <span>Biggest loss: </span>
                        <span
                            style={{
                                color:
                                    lostPlState.biggestLoss === 0
                                        ? "var(--color-grey-300)"
                                        : "var(--color-trade-red)",
                            }}>
                            {lostPlState.biggestLoss &&
                                `-$${(lostPlState.biggestLoss * -1).toFixed(
                                    2
                                )}`}
                        </span>
                    </div>
                    <div>
                        <span>Lost days: </span>
                        <span>{lostPlState.lostDays}</span>
                    </div>

                    <div>
                        <span>Total lost trades: </span>
                        <span>{countSt.lostTrades}</span>
                    </div>

                    <div>
                        <span>Won trades (%): </span>
                        <span>
                            {countSt.wonTrades === 0
                                ? "0%"
                                : `${(
                                      (countSt.wonTrades /
                                          user.trades?.length) *
                                      100
                                  ).toFixed(0)}%`}
                        </span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>Your account balance now: </span>
                        <span>${user.info.account}</span>
                    </div>
                    <div>
                        <span>Account P/L </span>
                        <span
                            style={{
                                color:
                                    countSt.totalProfit === 0
                                        ? "var(--color-grey-300)"
                                        : countSt.totalProfit > 0
                                        ? "var(--color-trade-green)"
                                        : "var(--color-trade-red)",
                            }}>
                            {countSt.totalProfit >= 0
                                ? `$${countSt.totalProfit.toFixed(2)}`
                                : `-$${(countSt.totalProfit * -1).toFixed(2)}`}
                        </span>
                    </div>
                    <div>
                        <span>Average lost day P/L: </span>
                        <span
                            style={{
                                color:
                                    lostPlState.averageLostDayPl === 0
                                        ? "var(--color-grey-300)"
                                        : "var(--color-trade-red)",
                            }}>
                            {lostPlState.averageLostDayPl &&
                                `-$${(
                                    lostPlState.averageLostDayPl * -1
                                ).toFixed(2)}`}
                        </span>
                    </div>
                    <div>
                        <span>Biggest win: </span>
                        <span
                            style={{
                                color:
                                    wonPlState.biggestWin === 0
                                        ? "var(--color-grey-300)"
                                        : "var(--color-trade-green)",
                            }}>
                            {`$${wonPlState.biggestWin?.toFixed(2)}`}
                        </span>
                    </div>{" "}
                    <div>
                        <span>Won days: </span>
                        <span>{wonPlState.wonDays}</span>
                    </div>
                    <div>
                        <span>Total won trades: </span>
                        <span>{countSt.wonTrades}</span>
                    </div>
                    <div>
                        <span>Total number of trades: </span>
                        <span>{user.trades.length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Stats
