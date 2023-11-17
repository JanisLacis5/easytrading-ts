import { FC } from "react"
import customFetch from "../../../../utils"
import "./friendsList.css"
import { useAppDispatch, useAppSelector } from "../../../../store/storeHooks"
import { updateUserField } from "../../../../features/userSlice"
import { closeRightSide } from "../../../../features/chatroomRightSideSlice"
import { setActiveChat } from "../../../../features/chatroomChatsSlice"
import { findFriendUsername } from "../../functions"

const FriendMenu: FC<{ friendEmail: string }> = ({ friendEmail }) => {
	const dispatch = useAppDispatch()

	const { user } = useAppSelector((store) => store.user)

	const removeFriend = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		try {
			const { data } = await customFetch.put("/remove-friend", {
				friendEmail: friendEmail,
				userId: user.id,
			})
			dispatch(updateUserField({ field: "friends", value: data.friends }))
			dispatch(
				updateUserField({ field: "messages", value: data.messages })
			)
		} catch (e) {
			console.log(e)
		}
	}

	const hideChats = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		try {
			const { data } = await customFetch.post("/hide-chats", {
				userId: user.id,
				friendEmail: friendEmail,
			})
			dispatch(
				updateUserField({
					field: "hiddenMessages",
					value: data.hiddenMessages,
				})
			)
		} catch (error) {
			console.log(error)
		}
	}

	const blockFriend = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		try {
			const { data } = await customFetch.post("/block-user", {
				userId: user.id,
				friendEmail: friendEmail,
			})
			// filter blocked users out of friends
			const newFriends = user.friends.filter(
				(fr) => fr.email !== friendEmail
			)
			dispatch(
				updateUserField({
					field: "blockedUsers",
					value: data.blockedUsers,
				})
			)
			dispatch(
				updateUserField({
					field: "friends",
					value: newFriends,
				})
			)
		} catch (error) {
			console.log(error)
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
			// check if users have messages together
			const isMessages = Object.keys(user.messages).find(
				(email) => email === friendEmail
			)
			if (!isMessages) {
				dispatch(
					updateUserField({
						field: "messages",
						value: { ...user.messages, [friendEmail]: [] },
					})
				)
			}
			dispatch(closeRightSide())
			// get full friend object
			const friend = await findFriendUsername(friendEmail)
			dispatch(setActiveChat({ value: friend }))
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className="friend-menu">
			<button type="button" onClick={newMessage}>
				<p>Send Message</p>
			</button>
			<button type="button" onClick={hideChats}>
				<p>Hide chats</p>
			</button>
			<button type="button" onClick={blockFriend}>
				<p>Block Friend</p>
			</button>
			<button type="button" onClick={removeFriend}>
				<p>Remove Friend</p>
			</button>
		</div>
	)
}
export default FriendMenu
