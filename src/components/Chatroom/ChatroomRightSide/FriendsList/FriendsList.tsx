import {RxCross2} from "react-icons/rx"
import {toggleFriendMenu} from "../../../../features/chatroomRightSideSlice"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import FriendMenu from "./FriendMenu"
import "./friendsList.css"

const FriendsList = () => {
    const dispatch = useAppDispatch()

    const {user} = useAppSelector((store) => store.user)
    const {friendsPage} = useAppSelector((store) => store.chatroomRightSide)

    return (
        <div className="friends-list">
            <h4>Friends</h4>
            {user?.friends.map((friend, index) => {
                const {username, email} = friend
                return (
                    <div key={index} className="friends-list-friend">
                        <div>
                            <h5>{username}</h5>
                            <p>{email}</p>
                        </div>
                        <div>
                            {friendsPage.friendMenu ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            dispatch(
                                                toggleFriendMenu({
                                                    page: "friendMenu",
                                                })
                                            )
                                        }>
                                        <RxCross2 />
                                    </button>
                                    <FriendMenu />
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        dispatch(
                                            toggleFriendMenu({
                                                page: "friendMenu",
                                            })
                                        )
                                    }>
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
                                            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default FriendsList
