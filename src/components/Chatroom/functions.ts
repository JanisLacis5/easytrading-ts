import customFetch from "../../utils"

export const findFriendUsername = async (friendEmail: string) => {
	const { data } = await customFetch.post("/find-username", {
		email: friendEmail,
	})
	const { email, username } = data.user
	return {
		email,
		username,
	}
}
