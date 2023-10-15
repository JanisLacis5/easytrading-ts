import "./dashboardlanding.css"
import {Pie} from "react-chartjs-2"
import "chart.js/auto"
import {useAppSelector} from "../../../store/storeHooks"
import {filterChart, countStats} from "../../../functions"
import {useState} from "react"
import {OpUnitType} from "dayjs"

const WinLossGraph = () => {
    const [filter, setFilter] = useState<OpUnitType>("all-time" as OpUnitType)

    const {user} = useAppSelector((store) => store.user)
    const trades =
        filter === ("all-time" as OpUnitType)
            ? user.trades
            : filterChart(user.trades, filter as OpUnitType)
    const {wonTrades, lostTrades, totalProfit} = countStats(trades)

    const data = {
        labels: ["Won", "Lost"],
        datasets: [
            {
                data: [wonTrades, lostTrades],
                backgroundColor: ["#50a343", "#da473a"],
                hoverOffset: 4,
            },
        ],
    }
    const options: any = {
        animation: false,
        showLine: false,
        responsive: true,
        aspectRatio: 1,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: {
                        size: 16,
                    },
                },
            },
        },
    }

    return (
        <section className="default-dashboard-graph">
            <h3>Won / Lost Trades</h3>
            <div className="pie-garph-container">
                <select
                    onChange={(e) => {
                        setFilter(
                            (e.target as HTMLSelectElement).value as OpUnitType
                        )
                    }}>
                    <option value="all-time">All time</option>
                    <option value="day">Today</option>
                    <option value="week">This week</option>
                    <option value="month">This month</option>
                    <option value="year">This year</option>
                </select>
                <div>
                    {wonTrades || lostTrades ? (
                        <Pie data={data} options={options} />
                    ) : (
                        <h4>No Data</h4>
                    )}
                </div>
            </div>
            <ul className="overall-stats">
                <li className="stat">
                    <p>
                        Won Trades : <span>{wonTrades}</span>
                    </p>
                </li>
                <li className="stat">
                    <p>
                        Lost Trades : <span>{lostTrades}</span>
                    </p>
                </li>
                <li className="stat">
                    <p>
                        Total Trades : <span>{trades?.length || 0}</span>
                    </p>
                </li>
                <li className="stat">
                    <p>
                        Win % :
                        <span>
                            {trades && trades.length
                                ? ((wonTrades / trades?.length) * 100).toFixed(
                                      0
                                  ) || 0
                                : 0}
                            %
                        </span>
                    </p>
                </li>
                <li className="stat">
                    <p>
                        Total P/L $ :{" "}
                        <span
                            style={
                                totalProfit < 0
                                    ? {color: "var(--red)"}
                                    : {color: "var(--green)"}
                            }>
                            {totalProfit < 0 ? "-" : "+"}$
                            {totalProfit < 0
                                ? totalProfit % 1 === 0
                                    ? totalProfit * -1
                                    : (totalProfit * -1).toFixed(2)
                                : totalProfit % 1 === 0
                                ? totalProfit
                                : totalProfit.toFixed(2)}
                        </span>
                    </p>
                </li>
            </ul>
        </section>
    )
}
export default WinLossGraph
