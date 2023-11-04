import { useAppSelector } from '../../../store/storeHooks'
import GreenBubble from './GreenBubble'
import WhiteBubble from './WhiteBubble'
import './chatroomTexts.css'

const ChatroomTexts = () => {
    const { user } = useAppSelector((store) => store.user)
    const { activeChat } = useAppSelector((store) => store.chatroomChats)

    const messages = user.messages[activeChat]

    return (
        <div className="chatroom-texts-container">
            {messages?.map((message, index) => {
                if (message.sender) {
                    return <GreenBubble key={index} message={{ ...message }} />
                } else {
                    return <WhiteBubble key={index} message={{ ...message }} />
                }
            })}
        </div>
    )
}
export default ChatroomTexts
