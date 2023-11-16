import { FC, useState } from "react"
import { IFriend } from "../../../../interfaces"
import UserContainer from "../UserContainer"
import "../chatroomRightSide.css"
import "./blockedUsers.css"
import BlockedUserMenu from "./BlockedUserMenu"
import { RxCross2 } from "react-icons/rx"
import { FriendmenuIcon } from "../FriendsList/FriendsListIcons"

const BlockedUserContainer: FC<{ friend: IFriend }> = ({ friend }) => {
	const [showBlockedMenu, setShowBlockedMenu] = useState<boolean>(false)
	const { username, email } = friend

	return (
		<div className="user-container">
			<UserContainer email={email} username={username} />
			<div>
				{showBlockedMenu ? (
					<>
						<button
							type="button"
							onClick={() => setShowBlockedMenu(!showBlockedMenu)}
						>
							<RxCross2 />
						</button>
						<BlockedUserMenu email={email} />
					</>
				) : (
					<button
						type="button"
						onClick={() => setShowBlockedMenu(!showBlockedMenu)}
					>
						<FriendmenuIcon />
					</button>
				)}
			</div>
		</div>
	)
}

export default BlockedUserContainer
