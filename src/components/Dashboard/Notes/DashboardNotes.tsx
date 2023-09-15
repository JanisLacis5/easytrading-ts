import "./dashboardnotes.css"
import {useSelector} from "react-redux"
import DashboardNote from "./DashboardNote"

const DashboardNotes = () => {
    const {user} = useSelector((store) => store.user)

    return (
        <section className="dashboard-notes">
            <h1>Notes</h1>
            <div className="dashboard-notes-container">
                {user.notes.length ? (
                    user.notes.map((note, index) => {
                        const {image, text, pinned} = note
                        return (
                            <DashboardNote
                                key={index}
                                text={text}
                                image={image}
                                pinned={pinned}
                                index={index}
                            />
                        )
                    })
                ) : (
                    <div className="no-notes">
                        <h1>You don't have any notes</h1>
                        <p>You can add note at user page</p>
                    </div>
                )}
            </div>
        </section>
    )
}
export default DashboardNotes
