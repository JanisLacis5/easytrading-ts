import { profitsPerDate } from "../../../functions"
import { IUserSingleTrade } from "../../../interfaces"

export interface IAnsArr {
	title: string
	start: Date
	end: Date
	profit: number
}

const events = (trades: IUserSingleTrade[] | null) => {
	if (!trades) {
		return null
	}
	const dateProfits = profitsPerDate(trades)
	let ansArr: IAnsArr[] = []
	for (const [key, value] of Object.entries(dateProfits)) {
		let newValue =
			value < 0 ? `-$${(value * -1).toFixed(2)}` : `$${value.toFixed(2)}`

		ansArr.push({
			profit: value,
			title: newValue,
			start: new Date(key),
			end: new Date(key),
		})
	}
	return ansArr
}

export default events
