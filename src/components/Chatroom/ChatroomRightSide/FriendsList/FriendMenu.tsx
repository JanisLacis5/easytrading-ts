import {FC} from "react"
import customFetch from "../../../../utils"
import "./friendsList.css"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import {updateUserField} from "../../../../features/userSlice"
import {closeRightSide} from "../../../../features/chatroomRightSideSlice"
import {setActiveChat} from "../../../../features/chatroomChatsSlice"
import {findFriendUsername} from "../../functions"
import {IFriend} from "../../../../interfaces"

const FriendMenu: FC<{friendEmail: string}> = ({friendEmail}) => {
    const dispatch = useAppDispatch()

    const {user} = useAppSelector((store) => store.user)

    const removeFriend = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        try {
            const {data} = await customFetch.put("/remove-friend", {
                friendEmail: friendEmail,
                userId: user.id,
            })
            dispatch(updateUserField({field: "friends", value: data.friends}))
            dispatch(updateUserField({field: "messages", value: data.messages}))
        } catch (e) {
            console.log(e)
        }
    }

    const newMessage = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        try {
            await customFetch.post("new-message", {
                friendEmail: friendEmail,
                userId: user.id,
            })
            const isMessages = Object.keys(user.messages).find(
                (email) => email === friendEmail
            )
            if (!isMessages) {
                dispatch(
                    updateUserField({
                        field: "messages",
                        value: {...user.messages, [friendEmail]: []},
                    })
                )
            }
            dispatch(closeRightSide())
            const friend = findFriendUsername(friendEmail, user.friends)
            dispatch(setActiveChat({value: friend as IFriend}))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="friend-menu">
            <button type="button" onClick={newMessage}>
                <p>Send Message</p>
            </button>
            <button type="button" onClick={removeFriend}>
                <p>Remove Friend</p>
            </button>
        </div>
    )
}
export default FriendMenu
