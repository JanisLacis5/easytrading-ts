import {FC} from "react"
import customFetch from "../../../../utils"
import "./friendsList.css"
import {useAppDispatch, useAppSelector} from "../../../../store/storeHooks"
import {updateUserField} from "../../../../features/userSlice"

const FriendMenu: FC<{friendEmail: string}> = ({friendEmail}) => {
    const dispatch = useAppDispatch()

    const {user} = useAppSelector((store) => store.user)

    const removeFriend = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        console.log(friendEmail)
        const {data} = await customFetch.put("/remove-friend", {
            friendEmail: friendEmail,
            userId: user.id,
        })
        dispatch(updateUserField({field: "friends", value: data.friends}))
        dispatch(updateUserField({field: "messages", value: data.messages}))
    }

    return (
        <div className="friend-menu">
            <button type="button">
                <p>Send Message</p>
            </button>
            <button type="button" onClick={removeFriend}>
                <p>Remove Friend</p>
            </button>
        </div>
    )
}
export default FriendMenu
