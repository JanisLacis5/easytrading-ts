import {Link} from "react-router-dom"
import "./usernotes.css"
import {useAppSelector} from "../../../store/storeHooks"

const UserNotes = () => {
    const {user} = useAppSelector((store) => store.user)
    const pinnedNotes = user.notes.filter((note) => note.pinned)

    return (
        <section className="user-notes">
            <h2>Pinned notes:</h2>
            <div className="user-notes-container">
                {pinnedNotes.length ? (
                    pinnedNotes.map((noteMain, index) => {
                        const {image, text} = noteMain
                        return (
                            <div className="user-note" key={index}>
                                <div>
                                    {image ? (
                                        <img src={image} alt="note image" />
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                                <p>{text}</p>
                            </div>
                        )
                    })
                ) : (
                    <h2>You haven't pinned any notes</h2>
                )}
            </div>
            <div>
                <Link to="/userpage/addnote">Add new note</Link>
            </div>
        </section>
    )
}
export default UserNotes
