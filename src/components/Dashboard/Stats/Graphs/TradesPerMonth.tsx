import {useEffect, useState} from "react"
import {tradesPerMonth} from "./graphData"
import {useAppSelector} from "../../../../store/storeHooks"
import {Bar} from "react-chartjs-2"

const TradesPerMonth = () => {
    const [trades, setTrades] = useState({})

    const {user} = useAppSelector((store) => store.user)

    const data = {
        labels: Object.keys(trades),
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
        const tempTrades = tradesPerMonth(user.trades)

        if (tempTrades) {
            setTrades(tempTrades)
        }
    }, [user])

    return (
        <div className="stats-graph">
            <h3>Trades per Month</h3>
            <Bar data={data} options={options} />
        </div>
    )
}
export default TradesPerMonth
