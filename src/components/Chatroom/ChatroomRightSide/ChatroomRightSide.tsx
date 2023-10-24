import {RxCross2} from "react-icons/rx"
import AddFriendForm from "./AddFriend/AddFriendForm"
import "./chatroomRightSide.css"
import {useAppDispatch, useAppSelector} from "../../../store/storeHooks"
import {closeRightSide} from "../../../features/chatroomRightSideSlice"

const ChatroomRightSide = () => {
    const dispatch = useAppDispatch()

    const {addFriend} = useAppSelector((store) => store.chatroomRightSide)

    return (
        <div className="chatroom-functions">
            <div>
                <button
                    type="button"
                    onClick={() => dispatch(closeRightSide())}>
                    <RxCross2 />
                </button>
            </div>
            {addFriend && <AddFriendForm />}
        </div>
    )
}

export default ChatroomRightSide
