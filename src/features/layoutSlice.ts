import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {IUserSingleLayout} from "../interfaces"

interface CounterState {
    layoutParams: IUserSingleLayout[]
    isDone: boolean
    isAddingScreener: boolean
    activeBlock: number | null
    layoutsMainHeight: number
    layoutsMainWidth: number
    isSaved: boolean
}

const initialState: CounterState = {
    layoutParams: [],
    isDone: false,
    isAddingScreener: false,
    activeBlock: null,
    layoutsMainHeight: 0,
    layoutsMainWidth: 0,
    isSaved: false,
}

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        setLayoutsMainParams: (
            state,
            action: PayloadAction<{height: number; width: number}>
        ) => {
            const {height, width} = action.payload
            if (height && width) {
                state.layoutsMainHeight = height
                state.layoutsMainWidth = width
            }
        },
        resetLayoutParams: (state) => {
            state.layoutParams = []
            state.isDone = false
        },
        editExistingLayout: (
            state,
            action: PayloadAction<IUserSingleLayout[]>
        ) => {
            state.layoutParams = [...action.payload]
        },

        ///////////////////////////////////////////////////////////////////////////////

        newLayoutScreener: (state, action: PayloadAction<"gap" | "hod">) => {
            state.layoutParams.push({
                screener: action.payload,
                x: 0,
                y: 0,
                height: (240 / state.layoutsMainHeight) * 100,
                width: (400 / state.layoutsMainWidth) * 100,
            })
        },
        setLayoutSize: (
            state,
            action: PayloadAction<{
                height: number
                width: number
                index: number
            }>
        ) => {
            const {height, width, index} = action.payload
            console.log(
                `passed to function = ${JSON.stringify([height, width])}`
            )
            state.layoutParams[index].height = height
            state.layoutParams[index].width = width
        },
        setLayoutPosition: (
            state,
            action: PayloadAction<{
                x: number
                y: number
                index: number
            }>
        ) => {
            const {x, y, index} = action.payload
            console.log(`passed to function = ${JSON.stringify([x, y])}`)
            state.layoutParams[index].x = x
            state.layoutParams[index].y = y
        },

        //////////////////////////////////////////////////////////////////////////////////

        setIsDone: (state, action: PayloadAction<boolean>) => {
            state.isDone = action.payload
        },
        setIsAddingScreener: (state, action: PayloadAction<boolean>) => {
            state.isAddingScreener = action.payload
        },
        setActiveBlock: (state, action: PayloadAction<number | null>) => {
            state.activeBlock = action.payload
        },
        setIsSaved: (state, action: PayloadAction<boolean>) => {
            state.isSaved = action.payload
        },
    },
})

export const {
    setLayoutSize,
    setLayoutPosition,
    newLayoutScreener,
    setIsDone,
    setIsAddingScreener,
    setActiveBlock,
    setLayoutsMainParams,
    setIsSaved,
    resetLayoutParams,
    editExistingLayout,
} = layoutSlice.actions
export default layoutSlice.reducer
