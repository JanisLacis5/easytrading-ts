import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {IUserSingleLayout} from "../interfaces"

interface CounterState {
    layoutParams: Record<number, IUserSingleLayout>
    isDone: boolean
    isAddingScreener: boolean
    activeBlock: number | null
}

const initialState: CounterState = {
    layoutParams: {},
    isDone: false,
    isAddingScreener: false,
    activeBlock: null,
}

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        newLayout: (
            state,
            action: PayloadAction<{index: number; layout: IUserSingleLayout}>
        ) => {
            const {index, layout} = action.payload
            state.layoutParams[index] = layout
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
