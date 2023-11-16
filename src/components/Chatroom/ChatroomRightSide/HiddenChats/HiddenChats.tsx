import "../FriendsList/friendsList.css"
import { useAppSelector } from "../../../../store/storeHooks"
import Friend from "../FriendsList/Friend"
import "../chatroomRightSide.css"

const HiddenChats = () => {
	const { user } = useAppSelector((store) => store.user)

	return (
		<div className="friends-list">
			<h4 className="menu-page-heading">Hidden Chats</h4>
			{user.hiddenMessages?.map((m, index) => {
				return <Friend key={index} friend={{ ...m }} hidden={true} />
			})}
		</div>
	)
}
export default HiddenChats
