import {setActiveChat} from "../../../features/chatroomChatsSlice"
import {IFriend, IMessage} from "../../../interfaces"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import "./chatroomLanding.css"
import {useState, useEffect, FC} from "react"
import userIcon from "../../../assets/user-icon.svg"
import {ChatIcon} from "./ChLandingIcons"
import customFetch from "../../../utils"

const ChatContainer: FC<{friend: IFriend}> = ({friend}) => {
    const dispatch = useAppDispatch()
    const [lastUserChat, setLastUserChat] = useState<IMessage>()

    const {user} = useAppSelector((store) => store.user)

    useEffect(() => {
        const userChats = user?.messages[friend.email]
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

    const onUserChatClick = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        const {data} = await customFetch.post("/last-chat", {
            username: friend.username,
            email: friend.email,
            userId: user.id,
        })
        dispatch(setActiveChat({value: data.lastActiveChat}))
    }

    return (
        <button
            type="button"
            className="chat-container"
            onClick={onUserChatClick}>
            <img src={userIcon} alt="profile picture" />
            <div>
                <h5>{friend.username}</h5>
                <p>
                    {lastUserChat ? (
                        `${lastUserChat?.message.slice(0, 30)}${
                            lastUserChat?.message.length &&
                            lastUserChat?.message.length > 30
                                ? "..."
                                : ""
                        }`
                    ) : (
                        <ChatIcon />
                    )}
                </p>
            </div>
        </button>
    )
}
export default ChatContainer
