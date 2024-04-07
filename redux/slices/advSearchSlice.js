import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import * as api from "../apiService"

const advSearchSlice = createSlice({
    name:"advanceSearch",
    initialState:{
        data:null,
        schoolData:null,
        coachingData:null,
        isGridView:true,
        isLoading: false,
        error:null,
    },
    reducers: {
        toggleViewType: (state) => {
          state.isGridView = !state.isGridView;
        }
      },
    extraReducers:(builder)=>{
        builder.addCase(fetchAdvSearchData.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchAdvSearchData.fulfilled,(state, action)=>{
            state.data = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(fetchAdvSearchData.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload
        });
    }
})

export const fetchAdvSearchData =createAsyncThunk(
    "fetchAdvSearchData",
    async (payload,thunkAPI) =>{
        try {
            const res = await api.fetchAdvSearchData(payload);
            return res;
        } catch (error) {
        
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

// Export the action creator
export const { toggleViewType } = advSearchSlice.actions;

export default advSearchSlice.reducer;