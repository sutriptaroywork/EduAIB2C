import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    menu: null
}


export const menuSubmenuSlice = createSlice({
    name: 'menuSubmenu',
    initialState,
    reducers: {
        updateMenuData: (state, action) => {
            state.menu = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { updateMenuData} = menuSubmenuSlice.actions

export const menu = (state) => state.menuSubmenu.menu

export default menuSubmenuSlice.reducer