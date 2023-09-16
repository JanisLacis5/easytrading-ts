import {createSlice} from "@reduxjs/toolkit"

interface CounterState {
    tradingButton: boolean
    screenersButton: boolean
}

const initialState: CounterState = {
    tradingButton: false,
    screenersButton: false,
}

const asideSlice = createSlice({
    name: "aside",
    initialState,
    reducers: {
        toggleTrading: (state) => {
            state.tradingButton = !state.tradingButton
        },
        toggleScreeners: (state) => {
            state.screenersButton = !state.screenersButton
        },
    },
})

export const {toggleTrading, toggleScreeners} = asideSlice.actions
export default asideSlice.reducer
