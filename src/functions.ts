import dayjs, { OpUnitType } from "dayjs"
import { IUserSingleNote, IUserSingleTrade } from "./interfaces"
import("dayjs/locale/en")

dayjs.locale("en", {
	weekStart: 1,
})

export const filterChart = (trades: IUserSingleTrade[], filter: OpUnitType) => {
	const res = trades?.filter((trade) => dayjs().isSame(trade.date, filter))
	return res
}

export const countStats = (trades: IUserSingleTrade[] | null) => {
	let wonTrades = 0
	let lostTrades = 0
	let totalProfit = 0

	if (trades && trades.length) {
		trades.map((trade) => {
			if (trade.pl > 0) {
				wonTrades++
			}
			if (trade.pl < 0) {
				lostTrades++
			}
			totalProfit += trade.pl
		})
	}

	return { wonTrades, lostTrades, totalProfit }
}

export const passwordRequirements = (password: string) => {
	if (
		password.length < 8 ||
		!/[A-Z]/.test(password) ||
		!/[a-z]/.test(password) ||
		!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
	) {
		return false
	}
	return true
}

export const profitableStocks = (trades: IUserSingleTrade[]) => {
	if (!trades || !trades.length) {
		return { profits: 0, stocks: 0 }
	}

	let tempTrades = [...trades]
	const tempTradesSet: Set<string> = new Set()
	let ansArr: number[] = Array(tempTrades.length).fill(0)

	let j = 0
	tempTrades = tempTrades.sort((a, b) => a.symbol.localeCompare(b?.symbol))
	ansArr[0] += tempTrades[0].pl
	tempTradesSet.add(tempTrades[0].symbol)

	for (let i = 1; i < tempTrades.length; i++) {
		tempTradesSet.add(tempTrades[i].symbol)
		if (tempTrades[i].symbol !== tempTrades[i - 1].symbol) {
			j++
		}
		ansArr[j] += tempTrades[i].pl
	}

	ansArr = ansArr.slice(0, tempTradesSet.size)
	let returnObj: { [key: string]: number } = {}
	let stocks = Array(...tempTradesSet)

	const loopLength = ansArr.length > 5 ? 5 : ansArr.length

	for (let i = 0; i < loopLength; i++) {
		const maxElement = Math.max(...ansArr)
		const elementIndex = ansArr.indexOf(maxElement)
		const stock = stocks[elementIndex]
		returnObj[stock] = maxElement
		ansArr.splice(elementIndex, 1)
	}

	return returnObj
}

export const profitsPerDate = (trades: IUserSingleTrade[] | null) => {
	if (!trades?.length) {
		return 0
	}
	let temp = [...trades]
	const sortedArr = temp.sort((a, b) => {
		const date1 = Number(a.date.replaceAll("-", ""))
		const date2 = Number(b.date.replaceAll("-", ""))
		return date1 - date2
	})

	let date = sortedArr[0].date
	let profits = {
		[date]: sortedArr[0].pl,
	}

	for (let i = 1; i < trades.length; i++) {
		if (sortedArr[i].date !== date) {
			date = sortedArr[i].date
			profits[date] = sortedArr[i].pl
			continue
		}
		profits[date] += sortedArr[i].pl
	}

	return profits
}

export const countPinnedNotes = (notes: IUserSingleNote[]) => {
	let count = 0
	notes.map((note) => {
		if (note.pinned) {
			count++
		}
	})
	return count
}
