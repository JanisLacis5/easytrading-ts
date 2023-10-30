import {useState} from "react"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import "./chatroomLanding.css"
import {toast} from "react-toastify"

const ChatInput = () => {
    const dispatch = useAppDispatch()

    const {user} = useAppSelector((store) => store.user)

    const [message, setMessage] = useState<string>("")

    const messageWs = new WebSocket("ws://localhost:3002")
    messageWs.onopen = () => {
        messageWs.send(
            JSON.stringify({
                id: user.id,
            })
        )
        // console.log("Connected to the message server")
    }
    messageWs.onmessage = ({data}) => {
        console.log(JSON.parse(data))
    }
    messageWs.onerror = (e) => {
        console.log("Error:")
        console.log(e)
    }

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message === "") {
            toast.error("Can't send empty message")
            return
        }

        const dateObj = new Date()
        const date = `${dateObj.getDay()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`
        const time = `${dateObj.getHours()}:${dateObj.getMinutes()}`

        messageWs.send(
            JSON.stringify({
                date: date,
                time: time,
                message: message,
                senderEmail: user.info.email,
                recieverEmail: "test@test.com",
            })
        )
        setMessage("")
    }

    return (
        <form className="chat-input" onSubmit={sendMessage}>
            <div>
                <input
                    type="text"
                    placeholder="Enter a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div>
                <button type="submit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                    </svg>
                </button>
            </div>
        </form>
    )
}
export default ChatInput
