import { useAppSelector } from "../../../../store/storeHooks"
import UserContainer from "../UserContainer"
import "../chatroomRightSide.css"

const BlockedUsers = () => {
	const { user } = useAppSelector((store) => store.user)
	return (
		<div className="user-container">
			<h4>Blocked Users</h4>
			{user.blockedUsers.map((u) => {
				return <UserContainer email={u.email} username={u.username} />
			})}
			<div></div>
		</div>
	)
}

export default BlockedUsers
