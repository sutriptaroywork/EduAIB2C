import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    activeTab: "topup",
  },
  reducers: {
    toggleActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { toggleActiveTab } = tokenSlice.actions;


export default tokenSlice.reducer;
