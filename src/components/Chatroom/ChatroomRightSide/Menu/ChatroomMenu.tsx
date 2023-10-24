import {
    setFriendReqPage,
    setMenuPage,
} from "../../../../features/chatroomRightSideSlice"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import "./chatroomMenu.css"

const ChatroomMenu = () => {
    const dispatch = useAppDispatch()

    const {menuPages} = useAppSelector((store) => store.chatroomRightSide)

    return (
        <div className="chatroom-menu">
            <h4>Menu</h4>
            <button
                className="friend-req-button"
                type="button"
                onClick={() =>
                    dispatch(
                        setMenuPage({
                            page: "friendRequests",
                        })
                    )
                }>
                <div>
                    <h5>Friend Requests</h5>
                    <div>
                        {menuPages.friendRequests && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        )}
                    </div>
                </div>
            </button>
            {menuPages.friendRequests && (
                <div className="cm-friend-requests">
                    <button
                        type="button"
                        onClick={() =>
                            dispatch(
                                setFriendReqPage({
                                    page: "recievedFriendReq",
                                })
                            )
                        }>
                        <h6>Recieved Friend Requests</h6>
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            dispatch(
                                setFriendReqPage({
                                    page: "sentFriendReq",
                                })
                            )
                        }>
                        <h6>Sent Friend Requests</h6>
                    </button>
                </div>
            )}
            <button
                type="button"
                onClick={() =>
                    dispatch(
                        setMenuPage({
                            page: "blocked",
                        })
                    )
                }>
                <h5>Blocked Users</h5>
            </button>
            <button
                type="button"
                onClick={() =>
                    dispatch(
                        setMenuPage({
                            page: "hidden",
                        })
                    )
                }>
                <h5>Hidden Chats</h5>
            </button>
        </div>
    )
}
export default ChatroomMenu
