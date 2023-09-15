import {Link} from "react-router-dom"
import "./addtrade.css"

const AddTradeLanding = () => {
    return (
        <section className="addtrade-landing">
            <div>
                <h2>Add your trades by:</h2>
                <div>
                    <Link to="addtradeform">Form</Link>
                    <Link to="addtradefile">File</Link>
                </div>
            </div>
        </section>
    )
}
export default AddTradeLanding
