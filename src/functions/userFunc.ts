import customFetch from "../utils"
import md5 from "md5"

export const loginFunc = async (email: string, password: string) => {
	try {
		const { data } = await customFetch.post("/login", {
			email: email,
			password: md5(password),
		})
		localStorage.setItem("token", data.token)
		if (data.message === "incorrect password") {
			return {
				error: true,
				message: "Incorret password",
			}
		}
		if (data.message) {
			return {
				error: true,
				message: data.message,
			}
		}

		return data.user
	} catch (error) {
		console.log(error)
	}
}
