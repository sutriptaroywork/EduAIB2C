import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import * as api from "../apiService";
const loginSlice = createSlice({
    name : "login",
    initialState:{
        isLoggedIn: false,
        isLoading: false,
        error:null,
    },
    extraReducers: (builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled,(state, action)=>{
            state.isLoggedIn = true;
            state.isLoading = false;
        });
        builder.addCase(loginUser.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload
        });
    }
});
export const loginUser = createAsyncThunk(
    "loginUser",
    async (payload,thunkAPI) => {
        try {
            const res = await api.loginWithCredentials(payload);
            
            return res;
        } catch (error) {
        
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const logoutUser = createAsyncThunk(
    "logoutUser",
    async (thunkAPI) => {
        try {
            const res = await api.logoutUser();
            localStorage.clear();
            document.cookie.split(";").forEach((c) => {
              document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            if (localStorage.length === 0 && !document.cookie) {
              router.push('/login');
            } else {
            }
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export default loginSlice.reducer;