import {setPage} from "../../../features/chatroomRightSideSlice"
import backgroundImage from "../../../photos/candlestick-chart.jpg"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import ChatroomTexts from "../ChatroomTexts/ChatroomTexts"
import ChatContainer from "./ChatContainer"
import ChatInput from "./ChatInput"
import "./chatroomLanding.css"
import {findFriendUsername} from "../functions"
import {AddFriendIcon, MenuIcon} from "./ChLandingIcons"

const ChatroomLanding = () => {
    const dispatch = useAppDispatch()

    const {user} = useAppSelector((store) => store.user)
    const {activeChat} = useAppSelector((store) => store.chatroomChats)

    return (
        <div className="chatroom-landing">
            <div className="chatroom-friends">
                <div className="chatroom-self">
                    <img
                        src={user.info.image}
                        alt="self-image"
                        draggable="false"
                        onDragStart={() => false}
                        onDoubleClick={() => false}
                    />
                    <div>
                        <button
                            type="button"
                            onClick={() =>
                                dispatch(setPage({page: "addFriend"}))
                            }>
                            <AddFriendIcon />
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                dispatch(
                                    setPage({
                                        page: "menu",
                                    })
                                )
                            }>
                            <MenuIcon />
                        </button>
                    </div>
                </div>
                {Object.keys(user.messages)?.map((email, index) => {
                    const friend = findFriendUsername(email, user.friends)
                    if (friend) {
                        return (
                            <ChatContainer key={index} friend={{...friend}} />
                        )
                    }
                })}
            </div>
            <div>
                <div className="chatroom-header">
                    <h3>{activeChat.username}</h3>
                </div>
                <div className="chatroom-texts">
                    <img src={backgroundImage} alt="candlestick-chart" />
                    <ChatroomTexts />
                    <ChatInput />
                </div>
            </div>
        </div>
    )
}

export default ChatroomLanding
