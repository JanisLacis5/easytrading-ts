import {useState} from "react"
import "./addFriend.css"
import {toast} from "react-toastify"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import {login} from "../../../../features/userSlice"

const AddFriendForm = () => {
    const dispatch = useAppDispatch()

    const [recieverFriendReqEmail, setRecieverFriendReqEmail] =
        useState<string>("")

    const {user} = useAppSelector((store) => store.user)

    // SEND FRIEND SOCKET
    const sendFriendWs = new WebSocket("ws://localhost:3004")
    sendFriendWs.onopen = () => {
        sendFriendWs.send(JSON.stringify({id: user.id}))
        console.log("Connected to the send friend request server")
    }
    sendFriendWs.onmessage = ({data}) => {
        const serverData = JSON.parse(data)
        console.log("received: ", serverData)
        if (serverData.status === "error") {
            toast.error(serverData.message)
        }
        if (serverData.status === "success") {
            toast.success("Sent")
            const {
                id,
                trades,
                notes,
                info,
                layouts,
                messages,
                friends,
                recievedFriendRequests,
            } = user
            dispatch(
                login({
                    id,
                    trades,
                    notes,
                    info,
                    layouts,
                    messages,
                    friends,
                    recievedFriendRequests,
                    sentFriendRequests: serverData.sentFriendReq,
                })
            )
        }

        setRecieverFriendReqEmail("")
    }
    sendFriendWs.onerror = (e) => {
        console.log("Error:", e)
    }
    ////////////////////////////////////////////////////////

    const sendFriendRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (recieverFriendReqEmail === user.info.email) {
            toast.error("You can't send friend request to yourself")
            setRecieverFriendReqEmail("")
            return
        }
        sendFriendWs.send(
            JSON.stringify({
                senderEmail: user.info.email,
                recieverEmail: recieverFriendReqEmail,
            })
        )
    }

    return (
        <div className="add-friend">
            <h4>Add friend</h4>
            <form onSubmit={sendFriendRequest}>
                <div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={recieverFriendReqEmail}
                        onChange={(e) =>
                            setRecieverFriendReqEmail(e.target.value)
                        }
                        required
                    />
                    <label
                        htmlFor="email"
                        className={
                            recieverFriendReqEmail === "" ? "" : "label-up"
                        }>
                        Email
                    </label>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddFriendForm
