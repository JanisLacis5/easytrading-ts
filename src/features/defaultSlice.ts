import {PayloadAction, createSlice} from "@reduxjs/toolkit"

interface IInitialStateKeys {
    [key: string]: number | boolean
}

interface IInitialState extends IInitialStateKeys {
    screenWidth: number
    isRequirements: boolean
    isMetReq: boolean
    isFilters: boolean
    showModal: boolean
}

const initialState: IInitialState = {
    screenWidth: window.innerWidth,
    isRequirements: false,
    isMetReq: true,
    isFilters: false,
    showModal: false,
}

const defaultSlice = createSlice({
    name: "default",
    initialState,
    reducers: {
        setWidth: (state, action: PayloadAction<number>) => {
            state.screenWidth = action.payload
        },
        setDefaultStateBool: (
            state,
            action: PayloadAction<{prop: string; value: boolean}>
        ) => {
            const {prop, value} = action.payload
            state[prop] = value
        },
    },
})

export const {setWidth, setDefaultStateBool} = defaultSlice.actions
export default defaultSlice.reducer
