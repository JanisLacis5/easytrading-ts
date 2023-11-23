import { FC, useEffect, useState } from "react"
import "./hiddenChats.css"
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks"
import customFetch from "../../../../utils"
import { updateUserField } from "../../../../features/userSlice"
import { setActiveChat } from "../../../../features/chatroomChatsSlice"
import { IFriend } from "../../../../interfaces"
import { findFriendUsername } from "../../functions"

const HiddenChatMenu: FC<{ email: string }> = ({ email }) => {
	const dispatch = useAppDispatch()
	const { user } = useAppSelector((store) => store.user)

	const [hiddenUser, setHiddenUser] = useState<IFriend>({} as IFriend)

	const unhideChats = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		const { data } = await customFetch.patch("/unhide-chat", {
			email: email,
			userId: user.id,
		})
		dispatch(
			updateUserField({
				field: "hiddenMessages",
				value: data.hiddenMessages,
			})
		)
	}

	const textHiddenUser = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		const { data } = await customFetch.post("update-active-chats-order", {
			userId: user.id,
			email: hiddenUser.email,
			username: hiddenUser.username,
		})
		dispatch(
			setActiveChat({
				value: data.lastActiveChat,
			})
		)
	}

	useEffect(() => {
		const asyncWrapper = async () => {
			const fullUser = await findFriendUsername(email)
			setHiddenUser(fullUser)
			return
		}
		asyncWrapper()
	})

	return (
		<div className="hidden-menu">
			<button type="button" onClick={unhideChats}>
				<p>Show (unhide) chats</p>
			</button>
			<button type="button" onClick={textHiddenUser}>
				<p>Text hidden user</p>
			</button>
		</div>
	)
}

export default HiddenChatMenu
