import { setPage } from '../../../features/chatroomRightSideSlice'
import backgroundImage from '../../../photos/candlestick-chart.jpg'
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks'
import ChatroomTexts from '../ChatroomTexts/ChatroomTexts'
import ChatContainer from './ChatContainer'
import ChatInput from './ChatInput'
import './chatroomLanding.css'

const ChatroomLanding = () => {
    const dispatch = useAppDispatch()

    const { user } = useAppSelector((store) => store.user)

    const findFriendUsername = (email: string) => {
        const fullFriendUser = user.friends.find(
            (friend) => friend.email === email
        )
        return fullFriendUser
    }

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
                                dispatch(setPage({ page: 'addFriend' }))
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                dispatch(
                                    setPage({
                                        page: 'menu',
                                    })
                                )
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                {Object.keys(user.messages)?.map((email, index) => {
                    const friend = findFriendUsername(email)
                    if (friend) {
                        return (
                            <ChatContainer key={index} friend={{ ...friend }} />
                        )
                    }
                })}
            </div>
            <div>
                <div className="chatroom-header"></div>
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
