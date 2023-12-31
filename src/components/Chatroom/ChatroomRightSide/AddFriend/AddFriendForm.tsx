import { useState } from "react"
import "./addFriend.css"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks"
import { updateUserField } from "../../../../features/userSlice"
import { findFriendUsername } from "../../functions"

const AddFriendForm = () => {
    const dispatch = useAppDispatch()

    const [recieverFriendReqEmail, setRecieverFriendReqEmail] =
        useState<string>("")

    const { user } = useAppSelector((store) => store.user)

    // SEND FRIEND SOCKET
    const sendFriendWs = new WebSocket("ws://localhost:3004")
    // send socket on open
    sendFriendWs.onopen = () => {
        sendFriendWs.send(JSON.stringify({ id: user.id }))
    }
    sendFriendWs.onmessage = ({ data }) => {
        const serverData = JSON.parse(data)
        // display error if there is one
        if (serverData.status === "error") {
            toast.error(serverData.message)
        }
        // send friend request
        if (serverData.status === "success") {
            toast.success("Sent")
            dispatch(
                updateUserField({
                    field: "sentFriendRequests",
                    value: serverData.sentFriendReq,
                })
            )
        }
        setRecieverFriendReqEmail("")
    }
    sendFriendWs.onerror = (e) => {
        console.log("Error:", e)
    }
    ////////////////////////////////////////////////////////

    const sendFriendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // check if request isnt being sent to sender himself
        if (recieverFriendReqEmail === user.data.email) {
            toast.error("You can't send friend request to yourself")
            setRecieverFriendReqEmail("")
            return
        }
        // check if recuever is not in friends already
        const isUserInFriends = user.friends.find(
            (fr) => fr.email === recieverFriendReqEmail
        )
        if (isUserInFriends) {
            const reciever = await findFriendUsername(recieverFriendReqEmail)
            toast.error(`You already have ${reciever.username} as a friend`)
            setRecieverFriendReqEmail("")
            return
        }
        // send request
        sendFriendWs.send(
            JSON.stringify({
                senderEmail: user.data.email,
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
