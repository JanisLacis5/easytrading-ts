import {useEffect, useState} from "react"
import {useAppSelector} from "../../../../store/storeHooks"
import {tradesPerHour} from "./graphData"
import {Bar} from "react-chartjs-2"

const TradesPerHour = () => {
    const [trades, setTrades] = useState({})

    const {user} = useAppSelector((store) => store.user)

    const data = {
        labels: Object.keys(trades),
        datasets: [
            {
                data: Object.values(trades),
                backgroundColor: ["rgba(0, 255, 242, 0.7)"], // var(--primary)
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
        const tempTrades = tradesPerHour(user.trades)
        if (tempTrades) {
            setTrades(tempTrades)
        }
    }, [user])

    return (
        <div className="stats-graph">
            <h3>Trades per Hour</h3>
            <Bar data={data} options={options} />
        </div>
    )
}
export default TradesPerHour
