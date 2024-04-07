import tableSplice from './slices/tableSplice'
import { configureStore } from '@reduxjs/toolkit'
import layoutSlice from './slices/layoutSlice'
import summarySlice from './slices/summarySlice'
import menuSubmenuSlice from './slices/menuSubmenuSlice'
import tokenSlice from './slices/tokenSlice'
import advSearchSlice from './slices/advSearchSlice'
import userDataSlice from './slices/userDataSlice'
import dashboardSlice from './slices/dashboardSlice'
import settingSlice from './slices/settingSlice'
import chatBotSlice from './slices/chatBotSlice'
import quizSlice from './slices/quizSlice'
import coinSlice from './slices/coinSlice'
import loginSlice from './slices/loginSlice'
import maintenanceSlice from './slices/maintenanceSlice'


export const store = configureStore({
  reducer: {
    maintenance: maintenanceSlice,
    layout:layoutSlice,
    summary:summarySlice,
    menuSubmenu : menuSubmenuSlice,
    token:tokenSlice,
    coin:coinSlice,
    advanceSearch:advSearchSlice,
    userData:userDataSlice,
    tableSplice : tableSplice,
    dashboardSlice:dashboardSlice,
    settingSlice:settingSlice,
    chatBotSlice:chatBotSlice,
    quizSlice:quizSlice,
    loginSlice:loginSlice,
  },
})