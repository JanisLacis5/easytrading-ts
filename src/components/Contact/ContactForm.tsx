import {useState} from "react"
import {useAppSelector} from "../../store/storeHooks"
import customFetch from "../../utils"
import {toast} from "react-toastify"

const ContactForm = () => {
    const [question, setQuestion] = useState("")
    const [message, setMessage] = useState("")

    const {user} = useAppSelector((store) => store.user)

    // SENDING MESSAGE TO DB ON SUBMIT
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {data} = await customFetch.post("/message", {
            id: user.id,
            email: user.info.email,
            question,
            message,
        })
        setMessage("")
        setQuestion("")
        toast.success(data.message)
    }

    return (
        <div className="contact-form">
            <form className="contact-form-main" onSubmit={handleSubmit}>
                <div className="contact-form-input-container">
                    <div className="floating">
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <label
                            htmlFor="subject"
                            className={question ? "label-up" : ""}>
                            What is the main question?
                        </label>
                    </div>
                </div>
                <div className="contact-form-input-container">
                    <textarea
                        name="mainMessage"
                        id="mainMessage"
                        cols={30}
                        rows={10}
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default ContactForm
