import "../FriendsList/friendsList.css"
import { useAppSelector } from "../../../../store/storeHooks"
import "../chatroomRightSide.css"
import HiddenChatContainer from "./HiddenChatContainer"

const HiddenChats = () => {
	const { user } = useAppSelector((store) => store.user)

	return (
		<div className="friends-list">
			<h4 className="menu-page-heading">Hidden Chats</h4>
			{/* map over hidden messages and display them */}
			{user.hiddenMessages?.map((m, index) => {
				return (
					<HiddenChatContainer
						key={index}
						email={m.email}
						username={m.username}
					/>
				)
			})}
		</div>
	)
}
export default HiddenChats
