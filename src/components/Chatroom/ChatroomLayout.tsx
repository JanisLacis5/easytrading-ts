import {useState} from "react"
import {Outlet} from "react-router-dom"
import {useAppSelector} from "../../store/storeHooks"

const Chatroomlayout = () => {
    const [messageText, setMessageText] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const {user} = useAppSelector((store) => store.user)

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

    // ADD FRIEND SOCKET
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

    const sendFriendRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        friendWs.send(
            JSON.stringify({
                sender: user.info.email,
                friend: email,
            })
        )
    }

    return (
        <section>
            {/* <Outlet/> */}
            <form onSubmit={sendMessage}>
                <label htmlFor="message">Message: </label>
                <input
                    type="text"
                    name="message"
                    id="message"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            <form onSubmit={sendFriendRequest}>
                <label htmlFor="email">User email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Add friend</button>
            </form>
        </section>
    )
}
export default Chatroomlayout
