import "./layouts.css"
import {useState} from "react"
import ScreenerBlock from "./ScreenerBlock"
import customFetch from "../../../utils"
import {setIsAddingScreener, setIsDone} from "../../../features/layoutSlice"
import {login} from "../../../features/userSlice"
import {toast} from "react-toastify"
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks"

const NewLayout = () => {
    const [userLayout, setUserLayout] = useState<string[]>([])
    const [notAllowedHover, setNotAllowedHover] = useState(false)

    const dispatch = useAppDispatch()

    const {isAddingScreener, layoutParams} = useAppSelector(
        (store) => store.layout
    )
    const {user} = useAppSelector((store) => store.user)

    const handleSubmit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        const {data} = await customFetch.post("/new-layout", {
            layout: layoutParams,
            id: user.id,
        })
        const {id, trades, notes, info} = user
        dispatch(login({id, trades, notes, info, layouts: data.layouts}))
        toast.success("success")
    }

    return (
        <section className="screener-layout">
            <div className="layouts-header">
                {isAddingScreener && notAllowedHover && (
                    <p>Press "Done" to add next screener</p>
                )}
                <div className="new-layout-buttons">
                    <div
                        className="screener-select-container"
                        onMouseEnter={() => setNotAllowedHover(true)}
                        onMouseLeave={() => setNotAllowedHover(false)}>
                        <select
                            value={""}
                            name="addScreener"
                            onChange={(e) => {
                                setUserLayout([...userLayout, e.target.value])
                                dispatch(setIsAddingScreener(true))
                            }}
                            disabled={isAddingScreener ? true : false}>
                            <option value="">Add Screener</option>
                            <option value="gap">Gap Screener</option>
                            <option value="hod">HOD Screener</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        style={
                            isAddingScreener
                                ? {backgroundColor: "green"}
                                : {
                                      backgroundColor: "green",
                                      opacity: "0.5",
                                      pointerEvents: "none",
                                  }
                        }
                        onClick={() => dispatch(setIsDone(true))}>
                        Done
                    </button>

                    <button type="button" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </div>
            <div className="new-layout-main">
                <div id="lines">
                    {userLayout.map((layout, index) => {
                        return (
                            <ScreenerBlock
                                key={index}
                                layout={layout}
                                index={index}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
export default NewLayout
