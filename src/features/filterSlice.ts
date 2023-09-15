import {createSlice} from "@reduxjs/toolkit"

const initialState = {
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
        setFilteredProducts: (state, {payload}) => {
            state.filteredProducts = payload.trades
        },
        updateFilters: (state, {payload}) => {
            const {name, value} = payload
            state.filters[name] = value
        },
        filterProducts: (state, {payload}) => {
            const {stock, action, date, PL} = state.filters
            const {trades} = payload
            if (trades) {
                let ansArr = [...trades]

                if (stock) {
                    ansArr = ansArr.filter((trade) =>
                        trade.stock.startsWith(stock.toUpperCase())
                    )
                }
                if (action) {
                    ansArr = trades.filter((trade) => trade.action === action)
                }
                if (date) {
                    ansArr = ansArr.filter((trade) => trade.date === date)
                }
                if (PL === "positive") {
                    ansArr = ansArr.filter((trade) => trade.pl > 0)
                }
                if (PL === "negative") {
                    ansArr = ansArr.filter((trade) => trade.pl < 0)
                }
                state.filteredProducts = ansArr
            }
        },
        clearFilters: (state, {payload}) => {
            const {trades} = payload
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
