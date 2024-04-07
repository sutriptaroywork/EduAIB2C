// coded by durgesh
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiService"

const initialState = {
    sideBarStatus:true,
    aiLearningStatus:false,
    isActive:"",
    searchData:null,
    userData:null,
    isLoading:false,
    error:null,
}
export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
      toggleSidebar: (state) => {
        state.sideBarStatus = !state.sideBarStatus
      },
      falseAiLearning : (state)=>{
        state.aiLearningStatus = false
      },
      trueAiLearning : (state)=>{
        state.aiLearningStatus = true
      },
      handleActiveTab : (state, action)=>{
        state.isActive = action.payload.isActive
      },
      saveProfileDataFunc:(state, action)=>{
        state.userData = action.payload
      },
      resetUserData:(state,action)=>{
        state.userData = null,
        state.searchData = null
      }
    },
    extraReducers:(builder)=>{
      builder.addCase(updateSearchDataRedux.pending,(state)=>{
          state.isLoading = true;
      });
      builder.addCase(updateSearchDataRedux.fulfilled,(state, action)=>{
          state.searchData = action.payload.data;
          state.isLoading = false;
      });
      builder.addCase(updateSearchDataRedux.rejected,(state, action)=>{
          state.isLoading = false;
          state.error = action.payload
      });
  }
  })

  export const updateSearchDataRedux =createAsyncThunk(
    "updateSearchDataRedux",
    async (payload,thunkAPI) =>{
        try {
            const res = await api.fetchSearchData(payload);
            return res;
        } catch (error) {
        
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
  
  export const { toggleSidebar,falseAiLearning,trueAiLearning,handleActiveTab,saveProfileDataFunc,resetUserData} = layoutSlice.actions
  
  export const searchData = (state)=>state.layout.searchData
  export const userProfileData = (state)=>state.layout?.userData


  
  export default layoutSlice.reducer