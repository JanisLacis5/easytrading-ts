import "./layouts.css"
import {AiOutlinePlus} from "react-icons/ai"
import {useState} from "react"
import ScreenerBlock from "./ScreenerBlock"
import {useGlobalContext} from "../../../context/globalContext"
import customFetch from "../../../utils"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {login} from "../../../features/userSlice"
import {toast} from "react-toastify"

const NewLayout = () => {
    const [userLayout, setUserLayout] = useState([])
    const [notAllowedHover, setNotAllowedHover] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {setIsDone, isAddingScreener, setIsAddingScreener, layoutParams} =
        useGlobalContext()
    const {user} = useSelector((store) => store.user)

    const handleSubmit = async (e) => {
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
                                setIsAddingScreener(true)
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
                        onClick={() => setIsDone(true)}>
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
