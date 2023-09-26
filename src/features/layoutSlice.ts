import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {IUserSingleLayout} from "../interfaces"

interface ILayoutPosition {
    x: number
    y: number
    height: number
    width: number
}

interface CounterState {
    layoutParams: IUserSingleLayout[]
    isDone: boolean
    isAddingScreener: boolean
    activeBlock: number | null
    layoutsMainHeight: number
    layoutsMainWidth: number
    layoutMainPosition: ILayoutPosition
    isSaved: boolean
}

const initialState: CounterState = {
    layoutParams: [],
    isDone: false,
    isAddingScreener: false,
    activeBlock: null,
    layoutsMainHeight: 0,
    layoutsMainWidth: 0,
    layoutMainPosition: {
        x: 0,
        y: 0,
        height: 0,
        width: 0,
    },
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
        setLayoutMainPosition: (
            state,
            action: PayloadAction<ILayoutPosition>
        ) => {
            const {x, y, height, width} = action.payload
            state.layoutMainPosition = {
                x: x,
                y: y,
                height: height,
                width: width,
            }
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
                height: (250 / state.layoutsMainHeight) * 100,
                width: (400 / state.layoutsMainWidth) * 100,
            })
        },
        setLayoutPosition: (
            state,
            action: PayloadAction<{
                x: number
                y: number
                height: number
                width: number
                index: number
            }>
        ) => {
            const {x, y, height, width, index} = action.payload
            console.log(
                `passed to function = ${JSON.stringify({
                    x: x.toFixed(0),
                    y: y.toFixed(0),
                    height: height.toFixed(0),
                    width: width.toFixed(0),
                })}`
            )
            state.layoutParams[index].x = x
            state.layoutParams[index].y = y
            state.layoutParams[index].height = height
            state.layoutParams[index].width = width
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
    setLayoutPosition,
    newLayoutScreener,
    setIsDone,
    setIsAddingScreener,
    setActiveBlock,
    setLayoutsMainParams,
    setIsSaved,
    setLayoutMainPosition,
    resetLayoutParams,
    editExistingLayout,
} = layoutSlice.actions
export default layoutSlice.reducer
