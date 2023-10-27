import {Outlet} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../store/storeHooks"
import "./chatroom.css"
import ChatroomRightSide from "./ChatroomRightSide/ChatroomRightSide"
import {toast} from "react-toastify"
import {login} from "../../features/userSlice"

const Chatroomlayout = () => {
    const dispatch = useAppDispatch()

    const {user} = useAppSelector((store) => store.user)
    const {main} = useAppSelector((store) => store.chatroomRightSide)

    // NOTIFICATION SOCKET
    const notiWs = new WebSocket("ws://localhost:5000")
    notiWs.onopen = () => {
        notiWs.send(
            JSON.stringify({
                id: user.id,
            })
        )
        // console.log("Connected to the noti server")
    }
    notiWs.onmessage = ({data}) => {
        const recData = JSON.parse(data)
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
        if (recData.status === "new friend") {
            console.log(recData)
            toast.warn(recData.status)
        }
        if (recData.friends) {
            const {
                id,
                trades,
                notes,
                info,
                layouts,
                messages,
                recievedFriendRequests,
            } = user
            dispatch(
                login({
                    id,
                    trades,
                    notes,
                    info,
                    layouts,
                    messages,
                    friends: recData.friends,
                    sentFriendRequests: recData.sentFriendReq,
                    recievedFriendRequests,
                })
            )
        }
    }
    notiWs.onerror = (e) => {
        console.log("Error:")
        console.log(e)
    }

    return (
        <section className="chatroom-layout">
            <Outlet />
            {main.showRightSide && <ChatroomRightSide />}
        </section>
    )
}
export default Chatroomlayout
