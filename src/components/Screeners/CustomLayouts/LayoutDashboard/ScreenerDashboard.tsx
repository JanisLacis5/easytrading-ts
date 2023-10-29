import {AiOutlinePlus} from "react-icons/ai"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import "../../screeners.css"
import {useEffect, useState} from "react"
import {IUserSingleLayout} from "../../../../interfaces"
import {useNavigate} from "react-router-dom"
import ReturnObject from "./ReturnObject"
import {
    editExistingLayout,
    resetLayoutParams,
    setEdit,
} from "../../../../features/layoutSlice"
import findEditableIndex from "./findEditableLayoutIndex"
import customFetch from "../../../../utils"
import {login} from "../../../../features/userSlice"
import {toast} from "react-toastify"

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
        dispatch(setEdit(findEditableIndex(layouts, mapLayout)))
        navigate("/screeners/new-layout")
    }

    const deleteLayout = async (index: number) => {
        const {data} = await customFetch.put("/delete-layout", {
            index: index,
            id: user.id,
        })
        const {
            id,
            trades,
            notes,
            info,
            messages,
            friends,
            recievedFriendRequests,
            sentFriendRequests,
        } = user

        dispatch(
            login({
                id,
                trades,
                notes,
                info,
                layouts: data.layouts,
                messages,
                friends,
                recievedFriendRequests,
                sentFriendRequests,
            })
        )
        setLayouts(data.layouts)
        dispatch(resetLayoutParams())
        dispatch(setEdit(null))
        setActiveLayout(0)
        setMapLayout([])
        toast.success("successfully deleted layout")
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
            <h3>Layouts</h3>
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
                                                          "var(--green)",
                                                      color: "#fff",
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
                    <div className="edit-buttons">
                        <button type="button" onClick={editLayout}>
                            Edit Nr. {activeLayout + 1}
                        </button>
                        <button
                            type="button"
                            id="delete-layout-button"
                            onClick={() => deleteLayout(activeLayout)}>
                            Delete Nr. {activeLayout + 1}
                        </button>
                    </div>
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
