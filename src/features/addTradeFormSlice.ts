import {PayloadAction, createSlice} from "@reduxjs/toolkit"

interface IInitialStateKeys {
    [key: string]: string
}

interface IInitialState extends IInitialStateKeys {
    stock: string
    accBefore: string
    accAfter: string
    date: string
    time: string
    action: string
}

const initialState: IInitialState = {
    stock: "",
    accBefore: "",
    accAfter: "",
    date: "",
    time: "",
    action: "",
}

const addTradeFormSlice = createSlice({
    name: "addTradeForm",
    initialState,
    reducers: {
        setState: (
            state,
            action: PayloadAction<{prop: string; value: string}>
        ) => {
            const {prop, value} = action.payload
            state[prop] = value
        },
    },
})

export const {setState} = addTradeFormSlice.actions
export default addTradeFormSlice.reducer
