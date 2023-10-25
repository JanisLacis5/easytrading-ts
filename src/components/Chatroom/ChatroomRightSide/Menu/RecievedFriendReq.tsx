import {login} from "../../../../features/userSlice"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import "./chatroomMenu.css"

const RecievedFriendReq = () => {
    const dispatch = useAppDispatch()

    const {user} = useAppSelector((store) => store.user)

    // ACCEPT / DECLINE FRIEND SOCKET
    const friendWs = new WebSocket("ws://localhost:3003")
    friendWs.onopen = () => {
        friendWs.send(JSON.stringify({id: user.id}))
        // console.log("Connected to the friend server")
    }
    friendWs.onmessage = ({data}) => {
        console.log("received: ", data)
    }
    friendWs.onerror = (e) => {
        console.log("Error:")
        console.log(e)
    }
    ////////////////////////////////////////////////////////

    const acceptFriendRequest = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        email: string
    ) => {
        e.preventDefault()
        friendWs.send(
            JSON.stringify({
                action: "accept",
                senderEmail: email,
                recieverEmail: user.info.email,
            })
        )
        const {
            id,
            trades,
            info,
            layouts,
            messages,
            recievedFriendRequests,
            sentFriendRequests,
        } = user
        const updatedFriends = [...user.friends, email]
        dispatch(
            login({
                id,
                trades,
                info,
                layouts,
                messages,
                friends: updatedFriends,
                recievedFriendRequests,
                sentFriendRequests,
            })
        )
    }

    const declineFriendRequest = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        email: string
    ) => {
        e.preventDefault()
        friendWs.send(
            JSON.stringify({
                action: "decline",
                senderEmail: email,
                recieverEmail: user.info.email,
            })
        )
        const updatedRecievedFriendReq = user.recievedFriendRequests.filter(
            (req) => req !== email
        )
        const {
            id,
            trades,
            info,
            layouts,
            messages,
            friends,
            sentFriendRequests,
        } = user

        dispatch(
            login({
                id,
                trades,
                info,
                layouts,
                messages,
                friends,
                recievedFriendRequests: updatedRecievedFriendReq,
                sentFriendRequests,
            })
        )
    }

    return (
        <div className="recieved-friend-req">
            <h4>Recieved Friend Requests</h4>
            {user?.recievedFriendRequests.map((req: string) => {
                return (
                    <div>
                        <h6>{req}</h6>
                        <div>
                            <button
                                type="button"
                                onClick={(e) => acceptFriendRequest(e, req)}>
                                Accept
                            </button>
                            <button
                                type="button"
                                onClick={(e) => declineFriendRequest(e, req)}>
                                Decline
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default RecievedFriendReq
