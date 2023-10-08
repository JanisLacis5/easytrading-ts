import {PayloadAction, createSlice} from "@reduxjs/toolkit"

interface IInitialState {
    screener: boolean
    trading: boolean
}

const initialState: IInitialState = {
    screener: false,
    trading: false,
}

const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        setScreener: (state, action: PayloadAction<{value: boolean}>) => {
            state.screener = action.payload.value
        },
        setTrading: (state, action: PayloadAction<{value: boolean}>) => {
            state.trading = action.payload.value
        },
    },
})

export const {setScreener, setTrading} = navbarSlice.actions
export default navbarSlice.reducer
