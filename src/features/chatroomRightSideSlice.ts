import {PayloadAction, createSlice} from "@reduxjs/toolkit"

interface IInitialStateKeys {
    [key: string]: boolean
}

interface IInitialState extends IInitialStateKeys {
    showRightSide: boolean
    addFriend: boolean
}

const initialState: IInitialState = {
    showRightSide: false,
    addFriend: false,
}

const chatroomRightSideSlice = createSlice({
    name: "chatroomRightSide",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<{page: string}>) => {
            state.showRightSide = true
            state[action.payload.page] = true
        },
        closeRightSide: (state) => {
            Object.keys(state).map((key) => (state[key] = false))
        },
    },
})

export const {setPage, closeRightSide} = chatroomRightSideSlice.actions
export default chatroomRightSideSlice.reducer
