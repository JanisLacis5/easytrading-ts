import {AiOutlinePlus} from "react-icons/ai"
import {useAppSelector} from "../../../store/storeHooks"
import "../screeners.css"
import {useEffect, useState} from "react"
import HodBlock from "./ScreenerBlocks/HodBlock"
import GapBlock from "./ScreenerBlocks/GapBlock"
import {IUserSingleLayout} from "../../../interfaces"
import {useNavigate} from "react-router-dom"

const ScreenerDashboard = () => {
    const navigate = useNavigate()
    const [activeLayout, setActiveLayout] = useState<number>(0)
    const [layouts, setLayouts] = useState<IUserSingleLayout[][]>()

    const {user} = useAppSelector((store) => store.user)

    useEffect(() => {
        setLayouts(user.layouts)
    }, [user])

    const returnLayout = (layoutIndex: number): JSX.Element => {
        if (!layouts) {
            return <></>
        }
        const layout = layouts[layoutIndex]

        layout.map((lay) => {
            const {screener, x, y, height, width} = lay
            if (screener === "hod") {
                return <HodBlock height={height} width={width} />
            }
            if (screener === "gap") {
                return <GapBlock height={height} width={width} />
            }
        })
        return <></>
    }

    return (
        <section className="screener-layout">
            <div className="layouts-header">
                <div className="layout-buttons">
                    <div className="layout-numbers">
                        {layouts &&
                            layouts.map((_, index) => {
                                return (
                                    <button
                                        type="button"
                                        onClick={() => setActiveLayout(index)}>
                                        {index + 1}
                                    </button>
                                )
                            })}
                        <button
                            type="button"
                            onClick={() => navigate("/screeners/new-layout")}>
                            <AiOutlinePlus />
                        </button>
                    </div>
                    <button type="button">
                        Edit layout Nr. {activeLayout + 1}
                    </button>
                </div>
            </div>
            <div className="layouts-main">{returnLayout(activeLayout)}</div>
        </section>
    )
}
export default ScreenerDashboard
