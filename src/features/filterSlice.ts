import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUserSingleTrade } from "../interfaces"

interface IFilters {
	stock: string
	action: string
	date: string
	PL: string
}

interface IFilterProducts {
	name: "stock" | "action" | "date" | "PL"
	value: string
}

interface IInitialState {
	filters: IFilters
	isFilters: boolean
	filteredProducts: IUserSingleTrade[]
}

const initialState: IInitialState = {
	filters: {
		stock: "",
		action: "",
		date: "",
		PL: "",
	},
	isFilters: false,
	filteredProducts: [],
}

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setFilteredProducts: (
			state,
			action: PayloadAction<{ trades: IUserSingleTrade[] }>
		) => {
			state.filteredProducts = action.payload.trades
		},
		updateFilters: (state, action: PayloadAction<IFilterProducts>) => {
			const { name, value } = action.payload
			state.filters[name] = value
		},
		filterProducts: (
			state,
			_action: PayloadAction<{ trades: IUserSingleTrade[] }>
		) => {
			const { stock, action, date, PL } = state.filters
			const { trades } = _action.payload
			if (trades) {
				let ansArr = [...trades]

				if (stock) {
					ansArr = ansArr.filter((trade: IUserSingleTrade) =>
						trade.stock.startsWith(stock.toUpperCase())
					)
				}
				if (action) {
					ansArr = trades.filter(
						(trade: IUserSingleTrade) => trade.action === action
					)
				}
				if (date) {
					ansArr = ansArr.filter(
						(trade: IUserSingleTrade) => trade.date === date
					)
				}
				if (PL === "positive") {
					ansArr = ansArr.filter(
						(trade: IUserSingleTrade) => trade.pl > 0
					)
				}
				if (PL === "negative") {
					ansArr = ansArr.filter(
						(trade: IUserSingleTrade) => trade.pl < 0
					)
				}
				state.filteredProducts = ansArr
			}
		},
		clearFilters: (
			state,
			action: PayloadAction<{ trades: IUserSingleTrade[] }>
		) => {
			const { trades } = action.payload
			state.filters.stock = ""
			state.filters.action = "default"
			state.filters.date = ""
			state.filters.PL = ""
			state.filteredProducts = trades
		},
		toggleFilters: (state) => {
			state.isFilters = !state.isFilters
		},
		closeFilters: (state) => {
			state.isFilters = false
		},
	},
})

export const {
	updateFilters,
	filterProducts,
	setFilteredProducts,
	clearFilters,
	toggleFilters,
	closeFilters,
} = filterSlice.actions
export default filterSlice.reducer
