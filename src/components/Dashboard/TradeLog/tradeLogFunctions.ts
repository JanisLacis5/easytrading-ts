import customFetch from "../../../utils"

export const getTrades = async (userId: string) => {
	const { data } = await customFetch.post("get-trades", {
		userId: userId,
	})
	return data.trades
}

export const calcAcc = (pl: number, account: string) => {
	return {
		accBefore: Number(account),
		accAfter: Number(account) + pl,
	}
}
