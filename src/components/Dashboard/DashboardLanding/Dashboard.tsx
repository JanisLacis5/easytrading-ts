import "../dashboard.css"
import WinLossGraph from "./WinLossGraph"
import ProfitableStocks from "./ProfitableStocks"
import Screener from "./Screener"

const Dashboard = () => {
    return (
        <section className="dashboard-landing">
            <WinLossGraph />
            <ProfitableStocks />
            <Screener />
        </section>
    )
}
export default Dashboard
