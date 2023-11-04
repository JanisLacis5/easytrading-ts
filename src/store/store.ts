import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import asideReducer from '../features/asideSlice'
import filterReducer from '../features/filterSlice'
import sortReducer from '../features/sortSlice'
import smallReducer from '../features/smallSlice'
import layoutReducer from '../features/layoutSlice'
import dangerZoneReducer from '../features/dangerZoneSlice'
import addTradeFormReducer from '../features/addTradeFormSlice'
import accountUpdateReducer from '../features/accuntUpdateSlice'
import defaultReducer from '../features/defaultSlice'
import userInfoFormReducer from '../features/userInfoFormSlice'
import navbarReducer from '../features/navbarSlice'
import screenerReducer from '../features/screenerSlice'
import chatroomRightSideReducer from '../features/chatroomRightSideSlice'
import chatroomChatsReducer from '../features/chatroomChatsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        aside: asideReducer,
        filter: filterReducer,
        sort: sortReducer,
        small: smallReducer,
        layout: layoutReducer,
        dangerZone: dangerZoneReducer,
        addTrade: addTradeFormReducer,
        accountUpdate: accountUpdateReducer,
        default: defaultReducer,
        userInfo: userInfoFormReducer,
        navbar: navbarReducer,
        screener: screenerReducer,
        chatroomRightSide: chatroomRightSideReducer,
        chatroomChats: chatroomChatsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
