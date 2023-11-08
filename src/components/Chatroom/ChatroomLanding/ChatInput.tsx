import {useState} from "react"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import "./chatroomLanding.css"
import {toast} from "react-toastify"
import {updateUserField} from "../../../features/userSlice"
import {SendMessageIcon} from "./ChLandingIcons"

const ChatInput = () => {
    const dispatch = useAppDispatch()

    const {user} = useAppSelector((store) => store.user)
    const {activeChat} = useAppSelector((store) => store.chatroomChats)

    const [message, setMessage] = useState<string>("")

    const messageWs = new WebSocket("ws://localhost:3002")
    messageWs.onopen = () => {
        messageWs.send(
            JSON.stringify({
                id: user.id,
            })
        )
    }
    messageWs.onmessage = ({data}) => {
        const {updatedMessages} = JSON.parse(data)
        dispatch(updateUserField({field: "messages", value: updatedMessages}))
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
                recieverEmail: activeChat.email,
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
                    <SendMessageIcon />
                </button>
            </div>
        </form>
    )
}
export default ChatInput
