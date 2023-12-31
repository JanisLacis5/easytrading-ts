import {useEffect, useState} from "react"
import {useAppSelector} from "../../../../store/storeHooks"
import {plPerHour} from "./graphData"
import {Bar} from "react-chartjs-2"

const PlPerHour = () => {
    const [pl, setPl] = useState({})

    const {user} = useAppSelector((store) => store.user)

    const data = {
        labels: Object.keys(pl),
        datasets: [
            {
                data: Object.values(pl),
                backgroundColor: ["rgba(80, 163, 67, 0.7)"], // var(--green)
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
        scales: {
            y: {
                ticks: {
                    callback: function (value: string) {
                        return "$ " + value
                    },
                },
            },
        },
    }

    useEffect(() => {
        const tempPl = plPerHour(user.trades)
        if (tempPl) {
            setPl(tempPl)
        }
    }, [user])

    return (
        <div className="stats-graph">
            <h3>P&L per Hour</h3>
            <Bar data={data} options={options} />
        </div>
    )
}
export default PlPerHour
