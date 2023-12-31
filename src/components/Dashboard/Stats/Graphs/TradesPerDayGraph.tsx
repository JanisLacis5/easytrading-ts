import {Bar} from "react-chartjs-2"
import "./graphs.css"
import {useAppSelector} from "../../../../store/storeHooks"
import {useEffect, useState} from "react"
import {tradesPerDay} from "./graphData"
import {weekDays} from "./constants"

const TradesPerdayGraph = () => {
    const [trades, setTrades] = useState({})

    const {user} = useAppSelector((store) => store.user)

    const data = {
        labels: weekDays,
        datasets: [
            {
                data: Object.values(trades),
                backgroundColor: ["rgba(0, 255, 244, 0.7)"], // var(--primary)
                borderColor: ["transparent"],
                barThickness: 32,
            },
        ],
    }

    const options: any = {
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    useEffect(() => {
        const tradesPerDayTemp = tradesPerDay(user.trades)
        if (tradesPerDayTemp) {
            setTrades(tradesPerDayTemp)
        }
    }, [user])

    return (
        <div className="stats-graph">
            <h3>Trades per Day </h3>
            <Bar data={data} options={options}></Bar>
        </div>
    )
}
export default TradesPerdayGraph
