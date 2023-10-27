import {
    setFriendReqPage,
    toggleFriendReqPage,
    setNewPage,
} from "../../../../features/chatroomRightSideSlice"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import "./chatroomMenu.css"

const ChatroomMenu = () => {
    const dispatch = useAppDispatch()

    const {menuPages} = useAppSelector((store) => store.chatroomRightSide)
    const {user} = useAppSelector((store) => store.user)

    return (
        <div className="chatroom-menu">
            <h4>Menu</h4>
            <button
                className="friend-req-button"
                type="button"
                onClick={() =>
                    dispatch(
                        setNewPage({
                            page: "friends",
                        })
                    )
                }>
                <div>
                    <h5>Friends</h5>
                </div>
            </button>
            <button
                className="friend-req-button"
                type="button"
                onClick={() =>
                    dispatch(
                        toggleFriendReqPage({
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
                        <div>
                            <h6>Recieved Friend Requests</h6>
                            {user?.recievedFriendRequests.length ? (
                                <div className="noti"></div>
                            ) : (
                                <div></div>
                            )}
                        </div>
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
                        setNewPage({
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
                        setNewPage({
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
