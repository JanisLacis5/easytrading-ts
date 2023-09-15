import {createSlice} from "@reduxjs/toolkit"

// true = (A-Z)
// false = (Z-A)

const initialState = {
    option: "date",
    value: null,
    sortedTrades: [],
}

const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setSortedTrades: (state, {payload}) => {
            state.sortedTrades = payload.trades
        },

        updateSort: (state, {payload}) => {
            if (payload.name === "date" && state.value === null) {
                state.value = false
                return
            }
            if (payload.name === state.option) {
                state.value = !state.value
            } else if (
                payload.name === "accAfter" ||
                payload.name === "accBefore" ||
                payload.name === "pl" ||
                payload.name === "stock"
            ) {
                state.value = true
                state.option = payload.name
            } else {
                state.value = false
                state.option = payload.name
            }
        },

        sortTrades: (state, {payload}) => {
            const {option, value} = state
            let ansArr = [...payload.trades]
            if (option === "date") {
                if (value) {
                    state.sortedTrades = ansArr.sort((a, b) => {
                        const date1 = Number(a.date.replaceAll("-", ""))
                        const date2 = Number(b.date.replaceAll("-", ""))
                        const clock1 = Number(a.time.replaceAll(":", ""))
                        const clock2 = Number(b.time.replaceAll(":", ""))
                        console.log(clock1)
                        if (date1 === date2) {
                            return clock1 - clock2
                        }
                        return date1 - date2
                    })
                } else {
                    state.sortedTrades = ansArr.sort((a, b) => {
                        const date1 = Number(a.date.replaceAll("-", ""))
                        const date2 = Number(b.date.replaceAll("-", ""))
                        const clock1 = Number(a.time.replaceAll(":", ""))
                        const clock2 = Number(b.time.replaceAll(":", ""))
                        console.log(clock1)
                        if (date1 === date2) {
                            return clock2 - clock1
                        }
                        return date2 - date1
                    })
                }
            }
            if (
                option === "accBefore" ||
                option === "accAfter" ||
                option === "pl"
            ) {
                if (value) {
                    state.sortedTrades = ansArr.sort(
                        (a, b) => b[option] - a[option]
                    )
                } else {
                    state.sortedTrades = ansArr.sort(
                        (a, b) => a[option] - b[option]
                    )
                }
            } else {
                if (value) {
                    state.sortedTrades = ansArr.sort((a, b) =>
                        a[option].localeCompare(b[option])
                    )
                } else {
                    state.sortedTrades = ansArr.sort((a, b) =>
                        b[option].localeCompare(a[option])
                    )
                }
            }
        },
    },
})

export const {setSortedTrades, updateSort, sortTrades} = sortSlice.actions
export default sortSlice.reducer
