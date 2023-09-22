import {AiOutlinePlus} from "react-icons/ai"
import {useAppSelector} from "../../../store/storeHooks"
import "../screeners.css"
import {useEffect, useState} from "react"
import {IUserSingleLayout} from "../../../interfaces"
import {useNavigate} from "react-router-dom"
import ReturnObject from "./ReturnObject"

const ScreenerDashboard = () => {
    const navigate = useNavigate()

    const [activeLayout, setActiveLayout] = useState<number>(0)
    const [layouts, setLayouts] = useState<IUserSingleLayout[][]>()
    const [mapLayout, setMapLayout] = useState<IUserSingleLayout[]>()

    const {user} = useAppSelector((store) => store.user)

    useEffect(() => {
        setLayouts(user.layouts)
    }, [user])

    useEffect(() => {
        if (layouts) {
            const layout = layouts[activeLayout]
            setMapLayout([...layout])
        }
    }, [activeLayout, user])

    return (
        <section className="screener-layout">
            <div className="layouts-header">
                <div className="layout-buttons">
                    <div className="layout-numbers">
                        {layouts &&
                            layouts.map((_, index) => {
                                return (
                                    <button
                                        key={index}
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
            <div className="layouts-main" style={{display: "flex"}}>
                {mapLayout?.map((layout, index) => {
                    return <ReturnObject layout={layout} index={index} />
                })}
            </div>
        </section>
    )
}
export default ScreenerDashboard
