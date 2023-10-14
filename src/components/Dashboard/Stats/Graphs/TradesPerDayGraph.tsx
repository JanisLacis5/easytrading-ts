import {Bar} from "react-chartjs-2"
import "./graphs.css"
import {ChartData} from "chart.js"
import {useAppSelector} from "../../../../store/storeHooks"
import {useEffect, useState} from "react"
import {tradesPerDay} from "./graphData"

interface ITrades {
    [key: string]: number
}

const TradesPerdayGraph = () => {
    const [trades, setTrades] = useState<ITrades>({})

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"]

    const {user} = useAppSelector((store) => store.user)

    const data: ChartData<"bar", number[], string> = {
        labels: weekDays,
        datasets: [
            {
                data: Object.values(trades),
                backgroundColor: ["rgba(42, 1, 229, 0.981)"],
                borderColor: ["rgba(47, 0, 255, 0.981)"],
                borderWidth: 1,
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
        const tradesPerDayTemp = tradesPerDay(weekDays, user.trades)
        if (tradesPerDayTemp) {
            setTrades(tradesPerDayTemp)
        }
    }, [user])

    useEffect(() => {
        console.log(trades)
    }, [trades])

    return (
        <section className="trades-per-day">
            <Bar data={data} options={options}></Bar>
        </section>
    )
}
export default TradesPerdayGraph
