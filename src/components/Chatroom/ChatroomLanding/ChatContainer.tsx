import {IMessage} from "../../../interfaces"
import {useAppSelector} from "../../../store/storeHooks"
import "./chatroomLanding.css"
import {useState, useEffect} from "react"

const ChatContainer = () => {
    const [lastUserChat, setLastUserChat] = useState<IMessage>()

    const {user} = useAppSelector((store) => store.user)

    useEffect(() => {
        const userChats = user?.messages["test1@test.com"]
        if (userChats) {
            let lastChat = userChats[0]
            userChats.map((chat) => {
                const chatDate = new Date(`${chat.date}T${chat.time}`)
                const lastChatDate = new Date(
                    `${lastChat.date}T${lastChat.time}`
                )
                lastChat =
                    chatDate.getTime() < lastChatDate.getTime()
                        ? lastChat
                        : chat
                setLastUserChat(lastChat)
            })
        }
    }, [user])

    return (
        <button type="button" className="chat-container">
            <img src={user.info.image} alt="profile picture" />
            <div>
                <h5>{user.info.username}</h5>
                <p>{lastUserChat?.text}</p>
            </div>
        </button>
    )
}
export default ChatContainer
