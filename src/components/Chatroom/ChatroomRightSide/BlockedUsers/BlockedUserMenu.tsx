import { FC } from "react"
import "./blockedUsers.css"

const BlockedUserMenu: FC<{ email: string }> = ({ email }) => {
	return (
		<div className="blocked-menu">
			<button type="button">
				<p>Unblock</p>
			</button>
		</div>
	)
}

export default BlockedUserMenu
