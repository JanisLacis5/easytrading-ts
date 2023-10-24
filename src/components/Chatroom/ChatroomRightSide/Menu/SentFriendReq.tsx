import {useAppSelector} from "../../../../store/storeHooks"
import "./chatroomMenu.css"

const SentFriendReq = () => {
    const {user} = useAppSelector((store) => store.user)

    return (
        <div className="sent-friend-req">
            <h4>Sent Friend Requests</h4>
            {user?.sentFriendRequests.map((req) => {
                return (
                    <div>
                        <h6>{req}</h6>
                    </div>
                )
            })}
        </div>
    )
}
export default SentFriendReq
