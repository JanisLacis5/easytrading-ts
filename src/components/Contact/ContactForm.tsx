import {useState} from "react"
import {useSelector} from "react-redux"
import customFetch from "../../utils"
import {toast} from "react-toastify"

const ContactForm = () => {
    const [question, setQuestion] = useState("")
    const [message, setMessage] = useState("")

    const {user} = useSelector((store) => store.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {data} = await customFetch.post("/message", {
            id: user.id,
            email: user.info.email,
            question,
            message,
        })
        setQuestion("")
        setMessage("")
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
                        cols="30"
                        rows="10"
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
