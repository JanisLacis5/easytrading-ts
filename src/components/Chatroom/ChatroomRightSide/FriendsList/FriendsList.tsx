import {useAppSelector} from "../../../../store/storeHooks"
import "./friendsList.css"

const FriendsList = () => {
    const {user} = useAppSelector((store) => store.user)

    return (
        <div className="friends-list">
            <h4>Friends</h4>
            {user?.friends.map((friend) => {
                return <div></div>
            })}
        </div>
    )
}
export default FriendsList
