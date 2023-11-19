import { FC } from "react"
import "./chatroomLanding.css"
import customFetch from "../../../utils"
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks"
import { updateUserField } from "../../../features/userSlice"

const ChatContainerMenu: FC<{ email: string }> = ({ email }) => {
	const dispatch = useAppDispatch()

	const { user } = useAppSelector((store) => store.user)

	const clearChat = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		const { data } = await customFetch.patch("/clear-chat", {
			email: email,
			userId: user.id,
		})

		dispatch(updateUserField({ field: "messages", value: data.messages }))
	}

	const deleteChats = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		const { data } = await customFetch.patch("/delete-chat", {
			email: email,
			userId: user.id,
		})

		dispatch(updateUserField({ field: "messages", value: data.messages }))
	}

	return (
		<div className="chat-container-menu">
			<button type="button" onClick={clearChat}>
				<p>Clear Chat</p>
			</button>
			<button type="button" onClick={deleteChats}>
				<p>Delete all chats from this user</p>
			</button>
		</div>
	)
}

export default ChatContainerMenu
