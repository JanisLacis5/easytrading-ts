import { FC } from "react"
import "./chatroomRightSide.css"

const UserContainer: FC<{ email?: string; username?: string }> = ({
	email,
	username,
}) => {
	return (
		<div className="user-container-main">
			<h5>{username}</h5>
			<p>{email}</p>
		</div>
	)
}

export default UserContainer
