import {useAppSelector} from "../../../../store/storeHooks"
import "./chatroomMenu.css"

const RecievedFriendReq = () => {
    const {user} = useAppSelector((store) => store.user)

    const tempArr = ["janiselacis@gmaol.com"]

    return (
        <div className="recieved-friend-req">
            <h4>Recieved Friend Requests</h4>
            {tempArr.map((req) => {
                return (
                    <div>
                        <h6>{req}</h6>
                        <div>
                            <button type="button">Accept</button>
                            <button type="button">Decline</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default RecievedFriendReq
