import {AiOutlinePlus} from "react-icons/ai"
import {useSelector} from "react-redux"
import "../screeners.css"
import {useState} from "react"
import HodBlock from "./ScreenerBlocks/HodBlock"
import GapBlock from "./ScreenerBlocks/GapBlock"

const ScreenerDashboard = () => {
    const [activeLayout, setActiveLayout] = useState(null)
    const {user} = useSelector((store) => store.user)

    return (
        <section className="screener-layout">
            <div className="layouts-header">
                <div className="layout-buttons">
                    <div className="layout-numbers">
                        {user.layouts?.map((_, index) => {
                            return (
                                <button
                                    type="button"
                                    onClick={() => setActiveLayout(index)}>
                                    {index + 1}
                                </button>
                            )
                        })}
                        <button type="button">
                            <AiOutlinePlus />
                        </button>
                    </div>
                    <button type="button">
                        Edit layout Nr. {activeLayout + 1}
                    </button>
                </div>
            </div>
            <div className="layouts-main">
                {user.layouts?.map((layout, index) => {
                    if (layout.screener === "hod") {
                        return <HodBlock key={index} />
                    }
                    if (layout.screener == "gap") {
                        return <GapBlock key={index} />
                    }
                })}
            </div>
        </section>
    )
}
export default ScreenerDashboard
