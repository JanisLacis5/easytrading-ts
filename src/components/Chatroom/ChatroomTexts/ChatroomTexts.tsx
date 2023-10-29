import GreenBubble from "./GreenBubble"
import WhiteBubble from "./WhiteBubble"
import "./chatroomTexts.css"

const ChatroomTexts = () => {
    const messages = [
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
        "dadsadada",
        "ddadaddadas",
        "ddadadadad",
    ]

    return (
        <div className="chatroom-texts-container">
            {messages.map((_, index) => {
                if (index % 2 === 0) {
                    return <GreenBubble key={index} />
                } else {
                    return <WhiteBubble key={index} />
                }
            })}
        </div>
    )
}
export default ChatroomTexts
