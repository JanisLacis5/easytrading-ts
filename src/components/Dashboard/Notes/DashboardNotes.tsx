import "./dashboardnotes.css"
import {useAppSelector} from "../../../store/storeHooks"
import DashboardNote from "./DashboardNote"
import {useEffect, useState} from "react"
import {IUserSingleNote} from "../../../interfaces"

const DashboardNotes = () => {
    const [notes, setNotes] = useState<IUserSingleNote[]>([])

    const {user} = useAppSelector((store) => store.user)

    useEffect(() => {
        setNotes(user.notes)
    }, [user])

    return (
        <section className="dashboard-notes">
            <h3>Notes</h3>
            <div className="dashboard-notes-container">
                {notes.length ? (
                    notes.map((note, index) => {
                        return <DashboardNote index={index} {...note} />
                    })
                ) : (
                    <div className="no-notes">
                        <h2>You don't have any notes</h2>
                        <h4>You can add note at user page</h4>
                    </div>
                )}
            </div>
        </section>
    )
}
export default DashboardNotes
