import "../FriendsList/friendsList.css"
import {useAppSelector} from "../../../../store/storeHooks"
import Friend from "../FriendsList/Friend"

const HiddenChats = () => {
    const {user} = useAppSelector((store) => store.user)

    return (
        <div className="friends-list">
            <h4>Hidden Chats</h4>
            {user.hiddenMessages?.map((m, index) => {
                return <Friend key={index} friend={{...m}} hidden={true} />
            })}
        </div>
    )
}
export default HiddenChats
