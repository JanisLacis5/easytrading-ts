import { setActiveChat } from '../../../features/chatroomChatsSlice'
import { IFriend, IMessage } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks'
import './chatroomLanding.css'
import { useState, useEffect, FC } from 'react'
import userIcon from '../../../assets/user-icon.svg'

const ChatContainer: FC<{ friend: IFriend }> = ({ friend }) => {
    const dispatch = useAppDispatch()
    const [lastUserChat, setLastUserChat] = useState<IMessage>()

    const { user } = useAppSelector((store) => store.user)

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

    const onUserChatClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        dispatch(setActiveChat({ value: friend }))
    }

    return (
        <button
            type="button"
            className="chat-container"
            onClick={onUserChatClick}
        >
            <img src={userIcon} alt="profile picture" />
            <div>
                <h5>{friend.username}</h5>
                <p>{`${lastUserChat?.message.slice(0, 30)}${
                    lastUserChat?.message.length &&
                    lastUserChat?.message.length > 30
                        ? '...'
                        : ''
                }`}</p>
            </div>
        </button>
    )
}
export default ChatContainer
