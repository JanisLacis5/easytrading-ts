import {useState} from "react"
import {Outlet} from "react-router-dom"
import {useAppSelector} from "../../store/storeHooks"
import {toast} from "react-toastify"
import "./chatroom.css"
import ChatroomRightSide from "./ChatroomRightSide/ChatroomRightSide"

const Chatroomlayout = () => {
    const [messageText, setMessageText] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const {user} = useAppSelector((store) => store.user)
    const {showRightSide} = useAppSelector((store) => store.chatroomRightSide)

    // MESSAGE SOCKET
    const messageWs = new WebSocket("ws://localhost:3002")
    messageWs.onopen = () => {
        messageWs.send(JSON.stringify({id: user.id}))
        // console.log("Connected to the message server")
    }
    messageWs.onmessage = ({data}) => {
        console.log("received: ", data)
    }
    messageWs.onerror = (e) => {
        console.log("Error:")
        console.log(e)
    }
    ////////////////////////////////////////////////////////

    // ACCEPT FRIEND SOCKET
    const friendWs = new WebSocket("ws://localhost:3003")
    friendWs.onopen = () => {
        // console.log("Connected to the friend server")
    }
    friendWs.onmessage = ({data}) => {
        console.log("received: ", data)
    }
    friendWs.onerror = (e) => {
        console.log("Error:")
        console.log(e)
    }
    ////////////////////////////////////////////////////////

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const date = new Date()
        const message = {
            time: `${date.getHours()}:${date.getMinutes()}`,
            date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
            text: messageText,
        }

        messageWs.send(
            JSON.stringify({senderId: user.id, recieverId: "", message})
        )
    }

    const acceptFriendRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        friendWs.send(
            JSON.stringify({
                senderEmail: user.info.email,
                friendEmail: email,
            })
        )
    }

    return (
        <section className="chatroom-layout">
            <Outlet />
            {showRightSide && <ChatroomRightSide />}
        </section>
    )
}
export default Chatroomlayout
