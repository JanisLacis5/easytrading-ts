import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IInitialState {
    activeChat: string
}

const initialState: IInitialState = {
    activeChat: '',
}

const chatroomChatSlice = createSlice({
    name: 'chatroomChats',
    initialState,
    reducers: {
        setActiveChat: (state, action: PayloadAction<{ value: string }>) => {
            state.activeChat = action.payload.value
        },
    },
})

export const { setActiveChat } = chatroomChatSlice.actions
export default chatroomChatSlice.reducer
