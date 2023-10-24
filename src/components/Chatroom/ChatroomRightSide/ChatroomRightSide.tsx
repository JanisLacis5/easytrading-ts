import {RxCross2} from "react-icons/rx"
import AddFriendForm from "./AddFriend/AddFriendForm"
import "./chatroomRightSide.css"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {closeRightSide} from "../../../features/chatroomRightSideSlice"
import ChatroomMenu from "./Menu/ChatroomMenu"
import SentFriendReq from "./Menu/SentFriendReq"

const ChatroomRightSide = () => {
    const dispatch = useAppDispatch()

    const {main, friendReqPages} = useAppSelector(
        (store) => store.chatroomRightSide
    )

    return (
        <div className="chatroom-functions">
            <div>
                <button
                    type="button"
                    onClick={() => dispatch(closeRightSide())}>
                    <RxCross2 />
                </button>
            </div>
            {main.addFriend && <AddFriendForm />}
            {main.menu && <ChatroomMenu />}
            {friendReqPages.sentFriendReq && <SentFriendReq />}
        </div>
    )
}

export default ChatroomRightSide
