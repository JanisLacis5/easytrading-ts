import { FC } from "react"
import "./chatroomTexts.css"

const ServerMessageBubble: FC<{ text: string }> = ({ text }) => {
	return (
		<div className="server-message-bubble">
			<p>{text}</p>
		</div>
	)
}

export default ServerMessageBubble
