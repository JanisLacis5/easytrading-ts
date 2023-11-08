import {useEffect, useState} from "react"
import {useAppSelector} from "../../../store/storeHooks"
import GreenBubble from "./GreenBubble"
import WhiteBubble from "./WhiteBubble"
import "./chatroomTexts.css"

const ChatroomTexts = () => {
    const {user} = useAppSelector((store) => store.user)
    const {activeChat} = useAppSelector((store) => store.chatroomChats)

    const [chatWindow, setChatWindow] = useState<Element | null>()

    const messages = user.messages[activeChat.email]

    useEffect(() => {
        setChatWindow(document.querySelector(".chatroom-texts-container"))
    }, [])

    useEffect(() => {
        chatWindow?.scrollTo(0, chatWindow.scrollHeight)
    }, [chatWindow, messages])

    return (
        <div className="chatroom-texts-container">
            {messages?.map((message, index) => {
                if (message.sender) {
                    return <GreenBubble key={index} message={{...message}} />
                } else {
                    return <WhiteBubble key={index} message={{...message}} />
                }
            })}
        </div>
    )
}
export default ChatroomTexts
