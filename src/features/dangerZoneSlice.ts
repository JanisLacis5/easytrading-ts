import {PayloadAction, createSlice} from "@reduxjs/toolkit"

interface CounterState {
    changePassword: boolean
    askPassword: boolean
    isDelete: boolean
}

const initialState: CounterState = {
    changePassword: false,
    askPassword: false,
    isDelete: false,
}

const dangerZoneSlice = createSlice({
    name: "dangerZone",
    initialState,
    reducers: {
        setChangePassword: (state, action: PayloadAction<boolean>) => {
            state.changePassword = action.payload
        },
        setAskPassword: (state, action: PayloadAction<boolean>) => {
            state.askPassword = action.payload
        },
        setIsDelete: (state, action: PayloadAction<boolean>) => {
            state.isDelete = action.payload
        },
    },
})

export const {setChangePassword, setAskPassword, setIsDelete} =
    dangerZoneSlice.actions
export default dangerZoneSlice.reducer
