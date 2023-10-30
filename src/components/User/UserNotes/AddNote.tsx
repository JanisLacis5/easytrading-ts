import {useState} from "react"
import "./usernotes.css"
import customFetch from "../../../utils"
import {toast} from "react-toastify"
import blankWhite from "../../../photos/blank-white-image.jpg"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {updateUserField} from "../../../features/userSlice"
import {useNavigate} from "react-router-dom"

const AddNote = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [image, setImage] = useState<string | ArrayBuffer | null>()
    const [text, setText] = useState("")

    const {user} = useAppSelector((store) => store.user)
    const {screenWidth} = useAppSelector((store) => store.default)

    const convertImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        dispatch(updateUserField({field: "notes", value: data.notes}))
        setImage("")
        setText("")
        toast.success("Note Added")
        navigate("/user-page/notes")
    }

    return (
        <section className="user-notes-addnote">
            <h2>Add note</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-notes-addnote-input">
                    <label htmlFor="image">
                        {screenWidth < 768 ? (
                            <h5>Add Image:</h5>
                        ) : (
                            <h4>Add Image:</h4>
                        )}
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={convertImage}
                    />
                    <label htmlFor="image" id="button">
                        Choose Image
                    </label>
                </div>
                <div className="user-notes-addnote-input">
                    <textarea
                        name="note"
                        id="note"
                        cols={30}
                        rows={10}
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
