import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store/storeHooks'
import { toast } from 'react-toastify'
import './chatroom.css'
import ChatroomRightSide from './ChatroomRightSide/ChatroomRightSide'

const Chatroomlayout = () => {
    const [messageText, setMessageText] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [recieverFriendReqEmail, setRecieverFriendReqEmail] =
        useState<string>('')

    const { user } = useAppSelector((store) => store.user)

    // MESSAGE SOCKET
    const messageWs = new WebSocket('ws://localhost:3002')
    messageWs.onopen = () => {
        messageWs.send(JSON.stringify({ id: user.id }))
        // console.log("Connected to the message server")
    }
    messageWs.onmessage = ({ data }) => {
        console.log('received: ', data)
    }
    messageWs.onerror = (e) => {
        console.log('Error:')
        console.log(e)
    }
    ////////////////////////////////////////////////////////

    // ACCEPT FRIEND SOCKET
    const friendWs = new WebSocket('ws://localhost:3003')
    friendWs.onopen = () => {
        // console.log("Connected to the friend server")
    }
    friendWs.onmessage = ({ data }) => {
        console.log('received: ', data)
    }
    friendWs.onerror = (e) => {
        console.log('Error:')
        console.log(e)
    }
    ////////////////////////////////////////////////////////

    // SEND FRIEND SOCKET
    const sendFriendWs = new WebSocket('ws://localhost:3004')
    sendFriendWs.onopen = () => {
        // console.log("Connected to the send friend request server")
    }
    sendFriendWs.onmessage = ({ data }) => {
        const serverData = JSON.parse(data)
        console.log('received: ', serverData)
        if (serverData.status === 'error') {
            toast.error(serverData.message)
            setRecieverFriendReqEmail('')
        }
    }
    sendFriendWs.onerror = (e) => {
        console.log('Error:')
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
            JSON.stringify({ senderId: user.id, recieverId: '', message })
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

    const sendFriendRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (recieverFriendReqEmail === user.info.email) {
            toast.error("You can't send friend request to yourself")
            setRecieverFriendReqEmail('')
            return
        }
        sendFriendWs.send(
            JSON.stringify({
                senderEmail: user.info.email,
                recieverEmail: recieverFriendReqEmail,
            })
        )
    }

    return (
        <section className="chatroom-layout">
            <Outlet />
            <ChatroomRightSide />
        </section>
    )
}
export default Chatroomlayout
