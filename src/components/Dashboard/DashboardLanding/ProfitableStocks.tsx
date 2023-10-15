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
                data: Object.values(profits),
                backgroundColor: ["rgba(0, 255, 242, 0.7)"],
                borderColor: ["transparent"],
                borderWidth: 1,
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

    return (
        <section className="stock-graph">
            <h3>Your most profitable stocks</h3>
            <div className="profitable-stocks">
                {profits ? (
                    <Bar data={data} options={options} />
                ) : (
                    <h4>No Data</h4>
                )}
            </div>
        </section>
    )
}
export default ProfitableStocks
