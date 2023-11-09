import {RxCross2} from "react-icons/rx"
import {IFriend} from "../../../../interfaces"
import "./friendsList.css"
import {FC, useState} from "react"
import FriendMenu from "./FriendMenu"
import {FriendmenuIcon} from "./FriendsListIcons"

const Friend: FC<{friend: IFriend; hidden: boolean}> = ({friend, hidden}) => {
    const [showFriendMenu, setShowFriendMenu] = useState<boolean>(false)
    const [showHiddenChatMenu, setShowHiddenChatMenu] = useState<boolean>(false)

    const {username, email} = friend

    return (
        <div className="friends-list-friend">
            <div>
                <h5>{username}</h5>
                <p>{email}</p>
            </div>
            <div>
                {showFriendMenu ? (
                    <>
                        <button
                            type="button"
                            onClick={
                                !hidden
                                    ? () => setShowFriendMenu(!showFriendMenu)
                                    : () =>
                                          setShowHiddenChatMenu(
                                              !showHiddenChatMenu
                                          )
                            }>
                            <RxCross2 />
                        </button>
                        <FriendMenu friendEmail={email} />
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={
                            !hidden
                                ? () => setShowFriendMenu(!showFriendMenu)
                                : () =>
                                      setShowHiddenChatMenu(!showHiddenChatMenu)
                        }>
                        <FriendmenuIcon />
                    </button>
                )}
            </div>
        </div>
    )
}
export default Friend
