import {FC} from "react"
import customFetch from "../../../../utils"
import "./friendsList.css"

const FriendMenu: FC<{friendEmail: string}> = ({friendEmail}) => {
    const removeFriend = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        const {data} = await customFetch.put("/remove-friend", {
            friendEmail: friendEmail,
        })
        console.log(data)
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
