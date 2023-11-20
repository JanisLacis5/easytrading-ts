import { FC } from "react"
import "./hiddenChats.css"
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks"
import customFetch from "../../../../utils"
import { updateUserField } from "../../../../features/userSlice"

const HiddenChatMenu: FC<{ email: string }> = ({ email }) => {
	const dispatch = useAppDispatch()
	const { user } = useAppSelector((store) => store.user)

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

	return (
		<div className="hidden-menu">
			<button type="button" onClick={unhideChats}>
				<p>Show (unhide) chats</p>
			</button>
		</div>
	)
}

export default HiddenChatMenu
