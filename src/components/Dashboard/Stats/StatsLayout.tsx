import TradesPerdayGraph from "./Graphs/TradesPerDayGraph"
import Stats from "./Table/Stats"
import "./statsLayout.css"

const StatsLayout = () => {
    return (
        <section className="stats">
            <Stats />
            <TradesPerdayGraph />
        </section>
    )
}
export default StatsLayout
