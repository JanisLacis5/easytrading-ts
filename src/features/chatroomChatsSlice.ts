import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {IFriend} from "../interfaces"

interface IInitialState {
    activeChat: IFriend
}

const initialState: IInitialState = {
    activeChat: JSON.parse(
        localStorage.getItem("lastActiveChat") || JSON.stringify({})
    ),
}

const chatroomChatSlice = createSlice({
    name: "chatroomChats",
    initialState,
    reducers: {
        setActiveChat: (state, action: PayloadAction<{value: IFriend}>) => {
            console.log(action.payload.value)
            localStorage.setItem(
                "lastActiveChat",
                JSON.stringify(action.payload.value)
            )
            state.activeChat = action.payload.value
        },
    },
})

export const {setActiveChat} = chatroomChatSlice.actions
export default chatroomChatSlice.reducer
