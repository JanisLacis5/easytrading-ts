import {AiOutlinePlus} from "react-icons/ai"
import {useAppSelector} from "../../../store/storeHooks"
import "../screeners.css"
import {useState} from "react"
import HodBlock from "./ScreenerBlocks/HodBlock"
import GapBlock from "./ScreenerBlocks/GapBlock"
import {IParams} from "./ScreenerBlock"

const ScreenerDashboard = () => {
    const [activeLayout, setActiveLayout] = useState<number>(0)
    const {user} = useAppSelector((store) => store.user)

    return (
        <section className="screener-layout">
            <div className="layouts-header">
                <div className="layout-buttons">
                    <div className="layout-numbers">
                        {Object.keys(user.layouts).map((_, index) => {
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
                {Object.values(user.layouts).map(
                    (layout: object | unknown, index: number) => {
                        if ((layout as IParams).screener === "hod") {
                            return <HodBlock key={index} />
                        }
                        if ((layout as IParams).screener == "gap") {
                            return <GapBlock key={index} />
                        }
                    }
                )}
            </div>
        </section>
    )
}
export default ScreenerDashboard
