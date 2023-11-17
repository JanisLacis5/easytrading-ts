import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IFriend } from "../interfaces"

interface IInitialState {
	activeChat: IFriend
	isBlocked: boolean
}

const initialState: IInitialState = {
	activeChat: {} as IFriend,
	isBlocked: false,
}

const chatroomChatSlice = createSlice({
	name: "chatroomChats",
	initialState,
	reducers: {
		setActiveChat: (state, action: PayloadAction<{ value: IFriend }>) => {
			state.activeChat = action.payload.value
		},
		setIsBlocked: (state, action: PayloadAction<{ value: boolean }>) => {
			state.isBlocked = action.payload.value
		},
	},
})

export const { setActiveChat, setIsBlocked } = chatroomChatSlice.actions
export default chatroomChatSlice.reducer
