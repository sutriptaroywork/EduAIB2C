import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import * as api from "../apiService"

const userDataSlice = createSlice({
    name:"userData",
    initialState:{
        data:null,
        isLoading: false,
        error:false,
    },
    reducers: {
        resetUserDataRedux:(state)=>{
          state.data = null
        }
      },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserData.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchUserData.fulfilled,(state, action)=>{
            state.data = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(fetchUserData.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload
        });

        builder.addCase(updateUserDataRedux.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(updateUserDataRedux.fulfilled,(state, action)=>{
            state.data = action.payload.data.profile;
            state.isLoading = false;
        });
        builder.addCase(updateUserDataRedux.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload
        });
    }
})

export const fetchUserData =createAsyncThunk(
    "fetchUserData",
    async (payload,thunkAPI) =>{
        try {
            const res = await api.fetchUserData(payload);
            return res;
        } catch (error) {
        
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateUserDataRedux =createAsyncThunk(
    "updateUserDataRedux",
    async (payload,thunkAPI) =>{
        try {
            const res = await api.postProfileData(payload);
            return res;
        } catch (error) {
        
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const {resetUserDataRedux} = userDataSlice.actions ;

export default userDataSlice.reducer;