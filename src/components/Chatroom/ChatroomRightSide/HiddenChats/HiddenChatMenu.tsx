import { FC } from "react"
import "./hiddenChats.css"

const HiddenChatMenu: FC<{ email: string }> = ({ email }) => {
	return (
		<div className="hidden-menu">
			<button type="button">
				<p>Show (unhide) chats</p>
			</button>
		</div>
	)
}

export default HiddenChatMenu
