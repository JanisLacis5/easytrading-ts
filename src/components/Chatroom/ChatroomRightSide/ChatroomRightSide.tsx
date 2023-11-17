import { RxCross2 } from "react-icons/rx"
import AddFriendForm from "./AddFriend/AddFriendForm"
import "./chatroomRightSide.css"
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks"
import {
	closeRightSide,
	setPage,
} from "../../../features/chatroomRightSideSlice"
import ChatroomMenu from "./Menu/ChatroomMenu"
import SentFriendReq from "./Menu/SentFriendReq"
import { useEffect, useState } from "react"
import RecievedFriendReq from "./Menu/RecievedFriendReq"
import FriendsList from "./FriendsList/FriendsList"
import HiddenChats from "./HiddenChats/HiddenChats"
import BlockedUsers from "./BlockedUsers/BlockedUsers"
import { BackButtonIcon } from "./ChatroomRightSideIcons"

const ChatroomRightSide = () => {
	const dispatch = useAppDispatch()

	const { main, friendReqPages, menuPages } = useAppSelector(
		(store) => store.chatroomRightSide
	)
	const [showCross, setShowCross] = useState<boolean>(true)

	// check whether cross or back button should be displayed
	useEffect(() => {
		setShowCross(true)
		Object.keys(friendReqPages).map((key) => {
			if (friendReqPages[key]) {
				setShowCross(false)
			}
		})
	}, [friendReqPages])

	useEffect(() => {
		setShowCross(true)
		Object.keys(menuPages).map((key) => {
			if (menuPages[key] && key !== "friendRequests") {
				setShowCross(false)
			}
		})
	}, [menuPages])

	return (
		<div className="chatroom-functions">
			<div>
				{showCross ? (
					<button
						type="button"
						onClick={() => dispatch(closeRightSide())}
					>
						<RxCross2 />
					</button>
				) : (
					<button
						type="button"
						onClick={() => dispatch(setPage({ page: "menu" }))}
					>
						<BackButtonIcon />
					</button>
				)}
			</div>
			{main.addFriend && <AddFriendForm />}
			{main.menu && <ChatroomMenu />}
			{menuPages.friends && <FriendsList />}
			{menuPages.hidden && <HiddenChats />}
			{menuPages.blocked && <BlockedUsers />}
			{friendReqPages.sentFriendReq && <SentFriendReq />}
			{friendReqPages.recievedFriendReq && <RecievedFriendReq />}
		</div>
	)
}

export default ChatroomRightSide
