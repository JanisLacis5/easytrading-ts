import {useState} from "react"
import {Outlet} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../store/storeHooks"
import "./chatroom.css"
import ChatroomRightSide from "./ChatroomRightSide/ChatroomRightSide"
import {toast} from "react-toastify"
import {login} from "../../features/userSlice"

const Chatroomlayout = () => {
    const dispatch = useAppDispatch()

    const [messageText, setMessageText] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const {user} = useAppSelector((store) => store.user)
    const {main} = useAppSelector((store) => store.chatroomRightSide)

    // // MESSAGE SOCKET
    // const messageWs = new WebSocket("ws://localhost:3002")
    // messageWs.onopen = () => {
    //     messageWs.send(JSON.stringify({id: user.id}))
    //     // console.log("Connected to the message server")
    // }
    // messageWs.onmessage = ({data}) => {
    //     console.log("received: ", data)
    // }
    // messageWs.onerror = (e) => {
    //     console.log("Error:")
    //     console.log(e)
    // }
    // ////////////////////////////////////////////////////////

    // // ACCEPT FRIEND SOCKET
    // const friendWs = new WebSocket("ws://localhost:3003")
    // friendWs.onopen = () => {
    //     // console.log("Connected to the friend server")
    // }
    // friendWs.onmessage = ({data}) => {
    //     console.log("received: ", data)
    // }
    // friendWs.onerror = (e) => {
    //     console.log("Error:")
    //     console.log(e)
    // }
    // ////////////////////////////////////////////////////////

    // NOTIFICATION SOCKET
    const notiWs = new WebSocket("ws://localhost:5000")
    notiWs.onopen = () => {
        notiWs.send(
            JSON.stringify({
                id: user.id,
            })
        )
        console.log("Connected to the noti server")
    }
    notiWs.onmessage = ({data}) => {
        const recData = JSON.parse(data)
        console.log("received: ", recData)
        if (recData.status === "new friend request") {
            toast.warn(recData.status)
        }
        if (recData.recievedFriendReq) {
            const {
                id,
                trades,
                notes,
                info,
                layouts,
                messages,
                friends,
                sentFriendRequests,
            } = user
            dispatch(
                login({
                    id,
                    trades,
                    notes,
                    info,
                    layouts,
                    messages,
                    friends,
                    sentFriendRequests,
                    recievedFriendRequests: recData.recievedFriendReq,
                })
            )
        }
    }
    notiWs.onerror = (e) => {
        console.log("Error:")
        console.log(e)
    }

    ////////////////////////////////////////////////////////

    // const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()

    //     const date = new Date()
    //     const message = {
    //         time: `${date.getHours()}:${date.getMinutes()}`,
    //         date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    //         text: messageText,
    //     }

    //     messageWs.send(
    //         JSON.stringify({senderId: user.id, recieverId: "", message})
    //     )
    // }

    // const acceptFriendRequest = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     friendWs.send(
    //         JSON.stringify({
    //             senderEmail: user.info.email,
    //             friendEmail: email,
    //         })
    //     )
    // }

    return (
        <section className="chatroom-layout">
            <Outlet />
            {main.showRightSide && <ChatroomRightSide />}
        </section>
    )
}
export default Chatroomlayout
