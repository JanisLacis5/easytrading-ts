import {
	setActiveChat,
	setIsBlocked,
} from "../../../features/chatroomChatsSlice"
import { IFriend, IMessage } from "../../../interfaces"
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks"
import "./chatroomLanding.css"
import { useState, useEffect, FC } from "react"
import userIcon from "../../../assets/user-icon.svg"
import { ChatIcon } from "./ChLandingIcons"
import customFetch from "../../../utils"
import { findFriendUsername } from "../functions"
import ChatContainerMenu from "./ChatContainerMenu"
import { FriendmenuIcon } from "../ChatroomRightSide/FriendsList/FriendsListIcons"
import { RxCross2 } from "react-icons/rx"

const ChatContainer: FC<{ email: string }> = ({ email }) => {
	const dispatch = useAppDispatch()

	const [lastUserChat, setLastUserChat] = useState<IMessage>()
	const [friend, setFriend] = useState<IFriend>()
	const [showChatMenu, setShowChatMenu] = useState<boolean>(false)

	const { user } = useAppSelector((store) => store.user)

	// get full friend object
	useEffect(() => {
		const asyncWrapper = async () => {
			const friend = await findFriendUsername(email)
			setFriend(friend)
		}
		asyncWrapper()
	}, [])

	// get last chat for container
	useEffect(() => {
		const userChats = user?.messages[email]
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

	// find out wheter "friend" is blocked
	useEffect(() => {
		if (friend) {
			const foundBlocked = user.blockedUsers.find(
				(u) => u.email === friend.email
			)
			if (foundBlocked) {
				dispatch(setIsBlocked({ value: true }))
			} else {
				dispatch(setIsBlocked({ value: false }))
			}
		}
	}, [friend])

	// set as last chat after open
	const onUserChatClick = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		const { data } = await customFetch.post("/set-last-chat", {
			username: friend?.username,
			email: friend?.email,
			userId: user.id,
		})
		dispatch(setActiveChat({ value: data.lastActiveChat }))
	}

	return (
		<button
			type="button"
			className="chat-container"
			onClick={onUserChatClick}
		>
			<img src={userIcon} alt="profile picture" />
			<div>
				<h5>{friend?.username}</h5>
				<p>
					{lastUserChat ? (
						`${lastUserChat?.message.slice(0, 30)}${
							lastUserChat?.message.length &&
							lastUserChat?.message.length > 30
								? "..."
								: ""
						}`
					) : (
						<span>
							<ChatIcon />
							send a message
						</span>
					)}
				</p>
			</div>
			<button
				type="button"
				onClick={() => setShowChatMenu(!showChatMenu)}
			>
				{showChatMenu ? <RxCross2 /> : <FriendmenuIcon />}
			</button>
			{showChatMenu && <ChatContainerMenu email={email} />}
		</button>
	)
}
export default ChatContainer
