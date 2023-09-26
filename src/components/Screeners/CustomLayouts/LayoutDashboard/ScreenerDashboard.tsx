import {AiOutlinePlus} from "react-icons/ai"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import "../../screeners.css"
import {useEffect, useState} from "react"
import {IUserSingleLayout} from "../../../../interfaces"
import {useNavigate} from "react-router-dom"
import ReturnObject from "./ReturnObject"
import {editExistingLayout} from "../../../../features/layoutSlice"

const ScreenerDashboard = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [activeLayout, setActiveLayout] = useState<number>(0)
    const [layouts, setLayouts] = useState<IUserSingleLayout[][]>()
    const [mapLayout, setMapLayout] = useState<IUserSingleLayout[]>()

    const {user} = useAppSelector((store) => store.user)

    const editLayout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!mapLayout) {
            throw new Error(
                "editLayout function in ScreenerDashboard didnt find layout to edit"
            )
        }
        dispatch(editExistingLayout(mapLayout))
        navigate("/screeners/new-layout")
    }

    useEffect(() => {
        setLayouts(user.layouts)
    }, [user])

    useEffect(() => {
        if (layouts && layouts.length) {
            const layout = layouts[activeLayout]
            setMapLayout([...layout])
        }
    }, [activeLayout, layouts])

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
                                        style={
                                            activeLayout === index
                                                ? {
                                                      backgroundColor:
                                                          "var(--color-trade-green)",
                                                      pointerEvents: "none",
                                                  }
                                                : {}
                                        }
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
                    <button type="button" onClick={editLayout}>
                        Edit layout Nr. {activeLayout + 1}
                    </button>
                </div>
            </div>
            <div className="layouts-main">
                {mapLayout?.map((layout, index) => {
                    return (
                        <ReturnObject
                            key={index}
                            layout={layout}
                            index={index}
                        />
                    )
                })}
            </div>
        </section>
    )
}
export default ScreenerDashboard
