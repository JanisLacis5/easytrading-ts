import { FC } from "react"
import "./blockedUsers.css"
import customFetch from "../../../../utils"
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks"
import { updateUserField } from "../../../../features/userSlice"
import { toast } from "react-toastify"
import { findFriendUsername } from "../../functions"

const BlockedUserMenu: FC<{ email: string }> = ({ email }) => {
	const dispatch = useAppDispatch()

	const { user } = useAppSelector((store) => store.user)

	const unblockUser = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		// send request to unblock user
		const { data } = await customFetch.post("/unblock-user", {
			userId: user.id,
			friendEmail: email,
		})

		// update fields in localstorage
		if (data.message) {
			const unblockedUser = await findFriendUsername(email)
			dispatch(
				updateUserField({
					field: "blockedUsers",
					value: data.blockedUsers,
				})
			)
			toast.warn(
				`You have unblokced ${unblockedUser.username}, but ${unblockedUser.username} has removed you from friends. To add ${unblockedUser.username} as friends, sebd friend request`
			)
		} else {
			const { blockedUsers, friends, messages } = data
			dispatch(
				updateUserField({ field: "blockedUsers", value: blockedUsers })
			)
			dispatch(updateUserField({ field: "friends", value: friends }))
			dispatch(updateUserField({ field: "messages", value: messages }))
		}
	}

	return (
		<div className="blocked-menu">
			<button type="button" onClick={unblockUser}>
				<p>Unblock</p>
			</button>
		</div>
	)
}

export default BlockedUserMenu
