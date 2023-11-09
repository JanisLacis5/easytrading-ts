import {useAppSelector} from "../../../../store/storeHooks"
import Friend from "./Friend"
import "./friendsList.css"

const FriendsList = () => {
    const {user} = useAppSelector((store) => store.user)

    return (
        <div className="friends-list">
            <h4>Friends</h4>
            {user?.friends.map((friend, index) => {
                return (
                    <Friend key={index} friend={{...friend}} hidden={false} />
                )
            })}
        </div>
    )
}
export default FriendsList
