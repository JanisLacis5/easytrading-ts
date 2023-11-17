import { useEffect, useState } from "react"
import { useAppSelector } from "../../../store/storeHooks"
import GreenBubble from "./GreenBubble"
import WhiteBubble from "./WhiteBubble"
import "./chatroomTexts.css"
import ServerMessageBubble from "./ServerMessageBubble"
import { IMessage } from "../../../interfaces"

const ChatroomTexts = () => {
	const { user } = useAppSelector((store) => store.user)
	const { activeChat, isBlocked } = useAppSelector(
		(store) => store.chatroomChats
	)

	const [chatWindow, setChatWindow] = useState<Element | null>()
	const [messages, setMessages] = useState<IMessage[]>([])

	// get chats containers div
	useEffect(() => {
		setChatWindow(document.querySelector(".chatroom-texts-container"))
	}, [])

	// scroll down on new message
	useEffect(() => {
		chatWindow?.scrollTo(0, chatWindow.scrollHeight)
	}, [chatWindow, messages])

	// get last active chat
	useEffect(() => {
		setMessages(user.messages[activeChat?.email])
	}, [activeChat])

	return (
		<div className="chatroom-texts-container">
			{/* map over messages and display them */}
			{messages?.map((message, index) => {
				if (message.sender) {
					return <GreenBubble key={index} message={{ ...message }} />
				} else {
					return <WhiteBubble key={index} message={{ ...message }} />
				}
			})}
			{isBlocked && (
				<ServerMessageBubble text="You have blocked this user" />
			)}
		</div>
	)
}
export default ChatroomTexts
