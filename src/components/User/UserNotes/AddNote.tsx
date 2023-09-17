import {useState} from "react"
import "./usernotes.css"
import customFetch from "../../../utils"
import {toast} from "react-toastify"
import {blankWhite} from "../../../photos/blank-white-image.jpg"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {login} from "../../../features/userSlice"
import {useNavigate} from "react-router-dom"

const AddNote = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [image, setImage] = useState("")
    const [text, setText] = useState("")

    const {user} = useAppSelector((store) => store.user)

    const convertImage = (e) => {
        const tgt = e.target
        const files = tgt.files

        if (FileReader && files && files.length) {
            const fr = new FileReader()
            fr.onload = function () {
                setImage(fr.result)
            }
            fr.readAsDataURL(files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (image === blankWhite && !text) {
            toast.error("Fill at least one field")
            return
        }
        const {data} = await customFetch.post("/note", {
            image,
            text,
            id: user.id,
        })
        dispatch(
            login({
                id: user.id,
                info: user.info,
                trades: user.trades,
                notes: data.notes,
            })
        )
        setImage("")
        setText("")
        toast.success("Note Added")
        navigate("/userpage/notes")
    }

    return (
        <section className="user-notes-addnote">
            <h2>Add note</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-notes-addnote-input">
                    <label htmlFor="image">Add image: </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={convertImage}
                    />
                </div>
                <div className="user-notes-addnote-input">
                    <textarea
                        name="note"
                        id="note"
                        cols="30"
                        rows="10"
                        placeholder="Text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </section>
    )
}
export default AddNote
