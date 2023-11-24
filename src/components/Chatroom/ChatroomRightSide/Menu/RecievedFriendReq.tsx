import { toast } from "react-toastify"
import { updateUserField } from "../../../../features/userSlice"
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks"
import "./chatroomMenu.css"

const RecievedFriendReq = () => {
    const dispatch = useAppDispatch()

    const { user } = useAppSelector((store) => store.user)

    // ACCEPT / DECLINE FRIEND SOCKET
    const friendWs = new WebSocket("ws://localhost:3003")
    // send socket on open
    friendWs.onopen = () => {
        friendWs.send(JSON.stringify({ id: user.id }))
    }
    friendWs.onmessage = ({ data }) => {
        console.log("received: ", JSON.parse(data))
        const parsedData = JSON.parse(data)
        // update friends on friend request accept
        if (parsedData.message === "friend request acccepted") {
            const { friends } = parsedData
            dispatch(
                updateUserField({
                    field: "friends",
                    value: friends,
                })
            )
        }
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
        // accept friend request
        friendWs.send(
            JSON.stringify({
                action: "accept",
                senderEmail: email,
                recieverEmail: user.data.email,
            })
        )
        // remove friend request thet was accepted and updateaccepted friend requests
        const updatedRecievedFriendReq = user.friends.filter(
            (req) => req.email !== email
        )
        dispatch(
            updateUserField({
                field: "recievedFriendRequests",
                value: updatedRecievedFriendReq,
            })
        )
        toast.success("New friend added")
    }

    const declineFriendRequest = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        email: string
    ) => {
        e.preventDefault()
        // decline friend request
        friendWs.send(
            JSON.stringify({
                action: "decline",
                senderEmail: email,
                recieverEmail: user.data.email,
            })
        )
        toast.error("Friend request declined")
        // remove friend request that was declined and update recieved  friend requests
        const updatedRecievedFriendReq = user.recievedFriendRequests.filter(
            (req) => req !== email
        )
        dispatch(
            updateUserField({
                field: "recievedFriendRequests",
                value: updatedRecievedFriendReq,
            })
        )
    }

    return (
        <div className="recieved-friend-req">
            <h4 className="menu-page-heading">Recieved Friend Requests</h4>
            {/* map over recieved friend requests and display them */}
            {user?.recievedFriendRequests.map((req: string, index) => {
                return (
                    <div key={index}>
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
