import {useState} from "react"
import "./dashboardnotes.css"
import {useDispatch, useSelector} from "react-redux"
import {login} from "../../../features/userSlice"
import {CiMenuKebab} from "react-icons/ci"
import customFetch from "../../../utils"
import {toast} from "react-toastify"
import {countPinnedNotes} from "../../../functions"

const DashboardNote = ({image, text, pinned, index}) => {
    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const {user} = useSelector((store) => store.user)

    const pinNote = async (e) => {
        e.preventDefault()
        if (countPinnedNotes(user.notes) > 2) {
            toast.error("You can't pin more than 3 notes")
            return
        }
        const {data} = await customFetch.patch("/noteupdate", {
            id: user.id,
            index: e.target.name,
            func: "pin",
        })
        dispatch(
            login({
                id: user.id,
                trades: user.trades,
                info: user.info,
                notes: data.notes,
                layouts: user.layouts,
            })
        )
    }

    const unpinNote = async (e) => {
        e.preventDefault()
        const {data} = await customFetch.patch("/noteupdate", {
            id: user.id,
            index: e.target.name,
            func: "unpin",
        })
        dispatch(
            login({
                id: user.id,
                trades: user.trades,
                info: user.info,
                notes: data.notes,
            })
        )
    }

    const deleteNote = async (e) => {
        e.preventDefault()
        const {data} = await customFetch.patch("/noteupdate", {
            id: user.id,
            index: e.target.name,
            func: "delete",
        })

        dispatch(
            login({
                id: user.id,
                trades: user.trades,
                info: user.info,
                notes: data.notes,
            })
        )
    }

    return (
        <div
            key={index}
            className={`dashboard-note
            ${isHovered ? "note-hovered" : "note-not-hovered"}`}
            onMouseEnter={() => {
                setIsHovered(true)
                setEdit(false)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
                setEdit(false)
            }}>
            <div
                className={
                    edit && isHovered
                        ? "dashboard-note-menu-show"
                        : "dashboard-note-menu-hide"
                }>
                <div>
                    <button
                        name={index}
                        type="button"
                        onClick={pinned ? unpinNote : pinNote}>
                        {pinned ? "Unpin" : "Pin"}
                    </button>
                    <button name={index} type="button" onClick={deleteNote}>
                        Delete
                    </button>
                </div>
            </div>
            <button type="button" onClick={() => setEdit(!edit)}>
                <CiMenuKebab size={18} />
            </button>
            <div>
                {image?.length ? (
                    <img src={image} alt="note image" />
                ) : (
                    <div className="janis"></div>
                )}
            </div>
            <div>
                <p>{text}</p>
            </div>
        </div>
    )
}
export default DashboardNote
