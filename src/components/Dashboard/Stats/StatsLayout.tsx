import PlPerHour from "./Graphs/PlPerHour"
import TradesPerdayGraph from "./Graphs/TradesPerDayGraph"
import TradesPerHour from "./Graphs/TradesPerHour"
import PlPerDay from "./Graphs/plPerDay"
import Stats from "./Table/Stats"
import "./statsLayout.css"

const StatsLayout = () => {
    return (
        <section className="stats">
            <Stats />
            <div>
                <TradesPerdayGraph />
                <PlPerDay />
            </div>
            <div>
                <TradesPerHour />
                <PlPerHour />
            </div>
        </section>
    )
}
export default StatsLayout
