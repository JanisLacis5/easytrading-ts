import { useAppSelector } from "../../../../store/storeHooks"
import "../chatroomRightSide.css"
import "./blockedUsers.css"
import BlockedUserContainer from "./BlockedUserContainer"

const BlockedUsers = () => {
	const { user } = useAppSelector((store) => store.user)

	return (
		<div className="blocked-users">
			<h4 className="menu-page-heading">Blocked Users</h4>
			{user.blockedUsers.map((u) => {
				return <BlockedUserContainer friend={{ ...u }} />
			})}
		</div>
	)
}

export default BlockedUsers
