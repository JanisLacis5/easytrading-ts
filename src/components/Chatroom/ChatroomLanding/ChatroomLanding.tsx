import { setPage } from "../../../features/chatroomRightSideSlice"
import backgroundImage from "../../../photos/candlestick-chart.jpg"
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks"
import ChatroomTexts from "../ChatroomTexts/ChatroomTexts"
import ChatContainer from "./ChatContainer"
import ChatInput from "./ChatInput"
import { AddFriendIcon, MenuIcon } from "./ChLandingIcons"
import { useEffect, useState } from "react"
import { IUserMessages } from "../../../interfaces"
import "./chatroomLanding.css"

const ChatroomLanding = () => {
	const dispatch = useAppDispatch()

	const [messages, setMessages] = useState<IUserMessages>()

	const { user } = useAppSelector((store) => store.user)
	const { activeChat } = useAppSelector((store) => store.chatroomChats)
	const { main } = useAppSelector((store) => store.chatroomRightSide)
	const { screenWidth } = useAppSelector((store) => store.default)

	// filter out hidden messages (do not show them on left on landing page)
	useEffect(() => {
		let filteredMessages: IUserMessages = {}

		Object.keys(user.messages)?.map((m) => {
			const isHidden = user.hiddenMessages.find((fr) => fr.email === m)
			if (!isHidden) {
				filteredMessages[m] = user.messages[m]
			}
		})

		setMessages({ ...filteredMessages })
	}, [user])

	return (
		<div className="chatroom-landing">
			<div className="chatroom-friends">
				<div className="chatroom-self">
					<img // users profile picture
						src={user.info.image}
						alt="self-image"
						draggable="false"
						onDragStart={() => false}
						onDoubleClick={() => false}
					/>
					<div>
						<button // add friend icon
							type="button"
							onClick={() =>
								dispatch(setPage({ page: "addFriend" }))
							}
						>
							<AddFriendIcon />
						</button>
						<button // menu icon
							type="button"
							onClick={() =>
								dispatch(
									setPage({
										page: "menu",
									})
								)
							}
						>
							<MenuIcon />
						</button>
					</div>
				</div>
				{/* map over messages and display on left side on landing page */}
				{/* TODO: map over friends instead of messages */}
				{messages &&
					Object.keys(messages)?.map((email, index) => {
						return <ChatContainer key={index} email={email} />
					})}
			</div>
			<div
				style={main.showRightSide ? { width: 0.47 * screenWidth } : {}}
			>
				<div className="chatroom-header">
					<h3>{activeChat.username}</h3>
				</div>
				<div className="chatroom-texts">
					<img src={backgroundImage} alt="candlestick-chart" />
					<ChatroomTexts />
					<ChatInput />
				</div>
			</div>
		</div>
	)
}

export default ChatroomLanding
