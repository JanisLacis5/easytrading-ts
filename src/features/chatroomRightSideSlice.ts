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
    friendsPage: IInitialStatePages
}

const initialState: IInitialState = {
    main: {
        showRightSide: false,
        addFriend: false,
        menu: false,
    },
    menuPages: {
        friends: false,
        friendRequests: false,
        blocked: false,
        hidden: false,
    },
    friendReqPages: {
        recievedFriendReq: false,
        sentFriendReq: false,
    },
    friendsPage: {
        friendMenu: false,
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
            Object.keys(state.friendReqPages).map(
                (key) => (state.friendReqPages[key] = false)
            )

            state.main.showRightSide = true
            state.main[action.payload.page] = true
        },
        closeRightSide: (state) => {
            Object.keys(state.main).map((key) => (state.main[key] = false))
            Object.keys(state.menuPages).map(
                (key) => (state.menuPages[key] = false)
            )
            Object.keys(state.friendReqPages).map(
                (key) => (state.friendReqPages[key] = false)
            )
        },
        toggleFriendReqPage: (
            state,
            action: PayloadAction<{
                page: "friendRequests"
            }>
        ) => {
            const temp = state.menuPages[action.payload.page]
            Object.keys(state.menuPages).map(
                (key) => (state.menuPages[key] = false)
            )

            state.menuPages[action.payload.page] = !temp
        },
        setNewPage: (
            state,
            action: PayloadAction<{page: "friends" | "hidden" | "blocked"}>
        ) => {
            Object.keys(state.menuPages).map(
                (key) => (state.menuPages[key] = false)
            )
            Object.keys(state.main).map((key) => (state.main[key] = false))

            state.main.showRightSide = true
            state.menuPages[action.payload.page] = true
        },
        setFriendReqPage: (
            state,
            action: PayloadAction<{
                page: "recievedFriendReq" | "sentFriendReq"
            }>
        ) => {
            Object.keys(state.main).map((key) => (state.main[key] = false))
            Object.keys(state.friendReqPages).map(
                (key) => (state.friendReqPages[key] = false)
            )

            state.main.showRightSide = true
            state.friendReqPages[action.payload.page] = true
        },
        toggleFriendMenu: (
            state,
            action: PayloadAction<{page: "friendMenu"}>
        ) => {
            const {page} = action.payload
            state.friendsPage[page] = !state.friendsPage[page]
        },
    },
})

export const {
    setPage,
    closeRightSide,
    setNewPage,
    setFriendReqPage,
    toggleFriendReqPage,
    toggleFriendMenu,
} = chatroomRightSideSlice.actions
export default chatroomRightSideSlice.reducer
