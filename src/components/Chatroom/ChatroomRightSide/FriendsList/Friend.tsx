import { RxCross2 } from "react-icons/rx"
import { IFriend } from "../../../../interfaces"
import "./friendsList.css"
import "../chatroomRightSide.css"
import { FC, useState } from "react"
import FriendMenu from "./FriendMenu"
import { FriendmenuIcon } from "./FriendsListIcons"
import UserContainer from "../UserContainer"

const Friend: FC<{ friend: IFriend }> = ({ friend }) => {
	const [showFriendMenu, setShowFriendMenu] = useState<boolean>(false)

	const { username, email } = friend

	return (
		<div className="user-container">
			<UserContainer email={email} username={username} />
			<div>
				{showFriendMenu ? (
					<>
						<button
							type="button"
							onClick={() => setShowFriendMenu(!showFriendMenu)}
						>
							<RxCross2 />
						</button>
						<FriendMenu friendEmail={email} />
					</>
				) : (
					<button
						type="button"
						onClick={() => setShowFriendMenu(!showFriendMenu)}
					>
						<FriendmenuIcon />
					</button>
				)}
			</div>
		</div>
	)
}
export default Friend
