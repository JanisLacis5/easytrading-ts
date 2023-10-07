import {PayloadAction, createSlice} from "@reduxjs/toolkit"

interface IInitialState {
    screener: boolean
}

const initialState: IInitialState = {
    screener: false,
}

const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        setScreener: (state, action: PayloadAction<{value: boolean}>) => {
            state.screener = action.payload.value
        },
    },
})

export const {setScreener} = navbarSlice.actions
export default navbarSlice.reducer
