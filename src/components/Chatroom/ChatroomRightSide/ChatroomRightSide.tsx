import { RxCross2 } from 'react-icons/rx'
import AddFriendForm from './AddFriend/AddFriendForm'
import './chatroomRightSide.css'

const ChatroomRightSide = () => {
    return (
        <div className="chatroom-functions">
            <div>
                <button type="button">
                    <RxCross2 />
                </button>
            </div>
            <AddFriendForm />
        </div>
    )
}

export default ChatroomRightSide
