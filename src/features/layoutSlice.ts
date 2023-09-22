import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {IUserSingleLayout} from "../interfaces"

interface CounterState {
    layoutParams: IUserSingleLayout[]
    isDone: boolean
    isAddingScreener: boolean
    activeBlock: number | null
}

const initialState: CounterState = {
    layoutParams: [],
    isDone: false,
    isAddingScreener: false,
    activeBlock: null,
}

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        newLayout: (state, action: PayloadAction<IUserSingleLayout>) => {
            const layout = action.payload
            console.log(`passed to function = ${JSON.stringify(layout)}`)

            state.layoutParams.push(layout)
        },
        setIsDone: (state, action: PayloadAction<boolean>) => {
            state.isDone = action.payload
        },
        setIsAddingScreener: (state, action: PayloadAction<boolean>) => {
            state.isAddingScreener = action.payload
        },
        setActiveBlock: (state, action: PayloadAction<number | null>) => {
            state.activeBlock = action.payload
        },
    },
})

export const {newLayout, setIsDone, setIsAddingScreener, setActiveBlock} =
    layoutSlice.actions
export default layoutSlice.reducer
