import UserContainer from "../UserContainer"
import { FC, useState } from "react"
import "../chatroomRightSide.css"
import { FriendmenuIcon } from "../FriendsList/FriendsListIcons"
import { RxCross2 } from "react-icons/rx"
import HiddenChatMenu from "./HiddenChatMenu"

const HiddenChatContainer: FC<{ email: string; username: string }> = ({
	email,
	username,
}) => {
	const [showHiddenMenu, setShowHiddenMenu] = useState<boolean>(false)
	return (
		<div className="user-container">
			<UserContainer email={email} username={username} />
			<div>
				{showHiddenMenu ? (
					<>
						<button
							type="button"
							onClick={() => setShowHiddenMenu(!showHiddenMenu)}
						>
							<RxCross2 />
						</button>
						<HiddenChatMenu email={email} />
					</>
				) : (
					<button
						type="button"
						onClick={() => setShowHiddenMenu(!showHiddenMenu)}
					>
						<FriendmenuIcon />
					</button>
				)}
			</div>
		</div>
	)
}

export default HiddenChatContainer
