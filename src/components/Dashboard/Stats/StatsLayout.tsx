import PlPerHour from "./Graphs/PlPerHour"
import TradesPerdayGraph from "./Graphs/TradesPerDayGraph"
import TradesPerHour from "./Graphs/TradesPerHour"
import PlPerDay from "./Graphs/PlPerDay"
import Stats from "./Table/Stats"
import "./statsLayout.css"
import TradesPerMonth from "./Graphs/TradesPerMonth"
import PlPerMonth from "./Graphs/PlPerMonth"

const StatsLayout = () => {
    return (
        <section className="stats">
            <Stats />
            <div>
                <TradesPerMonth />
                <PlPerMonth />
            </div>
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
