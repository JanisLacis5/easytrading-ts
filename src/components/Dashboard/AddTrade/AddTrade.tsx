import AddTradeForm from "./AddTradeForm"
import AddTradeFileReader from "./AddTradeFileReader"
import "./addtrade.css"

const AddTradeOnePage = () => {
    return (
        <section className="add-trade-landing">
            <AddTradeFileReader />
            <AddTradeForm />
        </section>
    )
}
export default AddTradeOnePage
