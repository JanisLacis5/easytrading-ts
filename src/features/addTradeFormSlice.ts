import {PayloadAction, createSlice} from "@reduxjs/toolkit"

interface IInitialStateKeys {
    [key: string]: string | number
}

interface IInitialState extends IInitialStateKeys {
    stock: string
    pl: number
    accBefore: number
    accAfter: number
    date: string
    time: string
    action: string
}

const initialState: IInitialState = {
    stock: "",
    pl: 0,
    accBefore: 0,
    accAfter: 0,
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
        setPl: (state, action: PayloadAction<string>) => {
            if (!action.payload.length) {
                return
            }
            state.pl = Number(action.payload)
        },
        setAcc: (
            state,
            action: PayloadAction<{accBefore: number; accAfter: number}>
        ) => {
            const {accAfter, accBefore} = action.payload
            state.accAfter = accAfter
            state.accBefore = accBefore
        },
    },
})

export const {setState, setPl, setAcc} = addTradeFormSlice.actions
export default addTradeFormSlice.reducer
