import "../layouts.css"
import {useEffect, useState} from "react"
import ScreenerBlock from "./ScreenerBlock"
import customFetch from "../../../../utils"
import {
    resetLayoutParams,
    setIsAddingScreener,
    setIsDone,
    setIsSaved,
    setLayoutsMainParams,
} from "../../../../features/layoutSlice"
import {login} from "../../../../features/userSlice"
import {toast} from "react-toastify"
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks"
import {useNavigate} from "react-router-dom"

const NewLayout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [userLayout, setUserLayout] = useState<string[]>([])
    const [notAllowedHover, setNotAllowedHover] = useState(false)
    const [layoutsMain, setLayoutsMain] = useState<Element | null>()

    const {isAddingScreener, layoutParams, isDone} = useAppSelector(
        (store) => store.layout
    )
    const {user} = useAppSelector((store) => store.user)

    const handleSubmit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        if (!userLayout.length) {
            toast.error("you must add at least 1 screener")
            return
        }
        const {data} = await customFetch.post("/new-layout", {
            layout: layoutParams,
            id: user.id,
        })
        const {id, trades, notes, info} = user
        dispatch(login({id, trades, notes, info, layouts: data.layouts}))
        dispatch(setIsSaved(true))
        dispatch(resetLayoutParams())
        toast.success("success")
        navigate("/screeners")
    }

    useEffect(() => {
        setLayoutsMain(document.querySelector(".new-layout-main"))
        dispatch(setIsSaved(false))
    }, [])

    useEffect(() => {
        if (layoutsMain) {
            dispatch(
                setLayoutsMainParams({
                    height: (layoutsMain as HTMLElement).offsetHeight,
                    width: (layoutsMain as HTMLElement).offsetWidth,
                })
            )
        }
    }, [layoutsMain])

    useEffect(() => {
        console.log(isDone)
    }, [isDone])

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
                                dispatch(setIsDone(false))
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
                    <button
                        type="button"
                        onClick={handleSubmit}
                        style={
                            isDone
                                ? {}
                                : {pointerEvents: "none", opacity: "0.5"}
                        }>
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
