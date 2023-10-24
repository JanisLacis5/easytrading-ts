import {PayloadAction, createSlice} from "@reduxjs/toolkit"

interface IInitialStateKeys {
    [key: string]: object
}

interface IInitialStatePages {
    [key: string]: boolean
}

interface IInitialState extends IInitialStateKeys {
    main: IInitialStatePages
    menuPages: IInitialStatePages
    friendReqPages: IInitialStatePages
}

const initialState: IInitialState = {
    main: {
        showRightSide: false,
        addFriend: false,
        menu: false,
    },
    menuPages: {
        friendRequests: false,
        blocked: false,
        hidden: false,
    },
    friendReqPages: {
        recievedFriendReq: false,
        sentFriendReq: false,
    },
}

const chatroomRightSideSlice = createSlice({
    name: "chatroomRightSide",
    initialState,
    reducers: {
        setPage: (
            state,
            action: PayloadAction<{
                page: "showRightSide" | "addFriend" | "menu"
            }>
        ) => {
            Object.keys(state.main).map((key) => (state.main[key] = false))
            Object.keys(state.menuPages).map(
                (key) => (state.menuPages[key] = false)
            )

            state.main.showRightSide = true
            state.main[action.payload.page] = true
        },
        closeRightSide: (state) => {
            Object.keys(state.main).map((key) => (state.main[key] = false))
            Object.keys(state.menuPages).map(
                (key) => (state.menuPages[key] = false)
            )
        },
        setMenuPage: (
            state,
            action: PayloadAction<{
                page: "friendRequests" | "blocked" | "hidden"
            }>
        ) => {
            const temp = state.menuPages[action.payload.page]
            Object.keys(state.menuPages).map(
                (key) => (state.menuPages[key] = false)
            )

            state.menuPages[action.payload.page] = !temp
        },
        setFriendReqPage: (
            state,
            action: PayloadAction<{
                page: "recievedFriendReq" | "sentFriendReq"
            }>
        ) => {
            Object.keys(state.friendReqPages).map(
                (key) => (state.friendReqPages[key] = false)
            )

            state.friendReqPages[action.payload.page] = true
        },
    },
})

export const {setPage, closeRightSide, setMenuPage, setFriendReqPage} =
    chatroomRightSideSlice.actions
export default chatroomRightSideSlice.reducer
