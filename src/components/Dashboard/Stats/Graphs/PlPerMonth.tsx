import {useState, useEffect} from "react"
import {useAppSelector} from "../../../../store/storeHooks"
import {plPerMonth} from "./graphData"
import {Bar} from "react-chartjs-2"

const PlPerMonth = () => {
    const [pl, setPl] = useState({})

    const {user} = useAppSelector((store) => store.user)

    const data = {
        labels: Object.keys(pl),
        datasets: [
            {
                data: Object.values(pl),
                backgroundColor: ["rgba(80, 163, 67, 0.7)"],
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
        const tempPl = plPerMonth(user.trades)

        if (tempPl) {
            setPl(tempPl)
        }
    }, [user])

    useEffect(() => {
        console.log(pl)
    }, [pl])

    return (
        <div className="stats-graph">
            <h3>P&L per Month</h3>
            <Bar data={data} options={options} />
        </div>
    )
}
export default PlPerMonth
