import {RxCross2} from "react-icons/rx"
import AddFriendForm from "./AddFriend/AddFriendForm"
import "./chatroomRightSide.css"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {closeRightSide, setPage} from "../../../features/chatroomRightSideSlice"
import ChatroomMenu from "./Menu/ChatroomMenu"
import SentFriendReq from "./Menu/SentFriendReq"
import {useEffect, useState} from "react"
import RecievedFriendReq from "./Menu/RecievedFriendReq"

const ChatroomRightSide = () => {
    const dispatch = useAppDispatch()

    const [showCross, setShowCross] = useState<boolean>(true)

    const {main, friendReqPages} = useAppSelector(
        (store) => store.chatroomRightSide
    )

    useEffect(() => {
        setShowCross(true)
        Object.keys(friendReqPages).map((key) => {
            if (friendReqPages[key]) {
                setShowCross(false)
            }
        })
    }, [friendReqPages])

    return (
        <div className="chatroom-functions">
            <div>
                {showCross ? (
                    <button
                        type="button"
                        onClick={() => dispatch(closeRightSide())}>
                        <RxCross2 />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => dispatch(setPage({page: "menu"}))}>
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
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                    </button>
                )}
            </div>
            {main.addFriend && <AddFriendForm />}
            {main.menu && <ChatroomMenu />}
            {friendReqPages.sentFriendReq && <SentFriendReq />}
            {friendReqPages.recievedFriendReq && <RecievedFriendReq />}
        </div>
    )
}

export default ChatroomRightSide
