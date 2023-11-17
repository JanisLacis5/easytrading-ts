import { useAppSelector } from "../../../../store/storeHooks"
import Friend from "./Friend"
import "./friendsList.css"
import "../chatroomRightSide.css"

const FriendsList = () => {
	const { user } = useAppSelector((store) => store.user)

	return (
		<div className="friends-list">
			<h4 className="menu-page-heading">Friends</h4>
			{/* map over friends and display them */}
			{user?.friends.map((friend, index) => {
				return <Friend key={index} friend={{ ...friend }} />
			})}
		</div>
	)
}
export default FriendsList
