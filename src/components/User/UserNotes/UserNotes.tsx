import {Link} from "react-router-dom"
import "./usernotes.css"
import {useAppSelector} from "../../../store/storeHooks"

const UserNotes = () => {
    const {user} = useAppSelector((store) => store.user)
    const {screenWidth} = useAppSelector((store) => store.default)
    const pinnedNotes = user.notes.filter((note) => note.pinned)

    return (
        <section className="user-notes">
            <h3>Pinned notes:</h3>
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
                ) : screenWidth < 576 ? (
                    <h6>You haven't pinned any notes</h6>
                ) : screenWidth < 768 ? (
                    <h5>PYou haven't pinned any notes</h5>
                ) : (
                    <h4>You haven't pinned any notes</h4>
                )}
            </div>
            <div>
                <Link to="/user-page/addnote">Add new note</Link>
            </div>
        </section>
    )
}
export default UserNotes
