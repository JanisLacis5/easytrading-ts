import {useEffect, useState} from "react"
import {useAppSelector} from "../../../store/storeHooks"
import {profitableStocks} from "../../../functions"
import {Bar} from "react-chartjs-2"

const ProfitableStocks = () => {
    const [profits, setProfits] = useState<{[key: string]: number}>({})

    const {user} = useAppSelector((store) => store.user)

    useEffect(() => {
        setProfits(profitableStocks(user.trades))
    }, [user.trades])

    const data = {
        labels: Object.keys(profits),
        datasets: [
            {
                label: "$",
                data: Object.values(profits),
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

    return (
        <section className="stock-graph">
            <h2 className="graph-title">Your most profitable stocks</h2>
            <div className="profitable-stocks">
                {profits ? (
                    <Bar data={data} options={options} />
                ) : (
                    <h2>No Data</h2>
                )}
            </div>
        </section>
    )
}
export default ProfitableStocks
