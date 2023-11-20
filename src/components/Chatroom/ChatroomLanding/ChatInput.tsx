import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks"
import "./chatroomLanding.css"
import { toast } from "react-toastify"
import { updateUserField } from "../../../features/userSlice"
import { SendMessageIcon } from "./ChLandingIcons"

const ChatInput = () => {
	const dispatch = useAppDispatch()

	const { user } = useAppSelector((store) => store.user)
	const { activeChat, isBlocked } = useAppSelector(
		(store) => store.chatroomChats
	)

	const [message, setMessage] = useState<string>("")
	const [isFriend, setIsFriend] = useState<boolean>(true)

	const messageWs = new WebSocket("ws://localhost:3002")

	// send socket to server on open
	messageWs.onopen = () => {
		messageWs.send(
			JSON.stringify({
				id: user.id,
			})
		)
	}
	messageWs.onmessage = ({ data }) => {
		// update messages after other user sends one
		const { updatedMessages } = JSON.parse(data)
		dispatch(updateUserField({ field: "messages", value: updatedMessages }))
	}
	messageWs.onerror = (e) => {
		console.log("Error:")
		console.log(e)
	}

	const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// check if message content is not empty
		if (message === "") {
			toast.error("Can't send empty message")
			return
		}

		// get date and time
		const dateObj = new Date()
		const date = `${dateObj.getDay()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`
		const time = `${dateObj.getHours()}:${dateObj.getMinutes()}`

		// send message
		messageWs.send(
			JSON.stringify({
				date: date,
				time: time,
				message: message,
				senderEmail: user.info.email,
				recieverEmail: activeChat.email,
			})
		)
		setMessage("")
	}

	// on disabled inputs click
	const onDisabledClick = () => {
		if (isBlocked) {
			toast.error("You have blocked this user. Unblock to text")
			return
		}
		if (!isFriend) {
			toast.error("You dont have this user as a friend. Add to text")
			return
		}
	}

	// check if users are still friends
	useEffect(() => {
		if (!activeChat) {
			return
		}
		const areFriends = user.friends.find(
			(fr) => fr.email === activeChat.email
		)
		if (typeof areFriends == "undefined") {
			setIsFriend(false)
		} else {
			setIsFriend(true)
		}
	}, [user, activeChat])

	return (
		<form className="chat-input" onSubmit={sendMessage}>
			<div>
				<input
					id="chatInput"
					type="text"
					placeholder="Enter a message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					disabled={isBlocked || !isFriend ? true : false}
					autoComplete="true"
				/>
				{(isBlocked || !isFriend) && (
					<div
						className="on-disabled-click"
						onClick={onDisabledClick}
					></div>
				)}
			</div>
			<div>
				<button
					type="submit"
					disabled={isBlocked || !isFriend ? true : false}
				>
					<SendMessageIcon />
				</button>
			</div>
		</form>
	)
}
export default ChatInput
