import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import * as api from "../apiService"


const initialState = {
    summaryData: null,
    summary:null,
    chatbotData:null,
    recommendation:null,
    suggestions:null,
    isLoading:false,
    isLoadingChatbot : false,
    error:null
}


export const summarySlice = createSlice({
    name: 'summary',
    initialState,
    reducers: {
        updateSummaryData: (state, action) => {
            state.summaryData = action.payload
        },
        resetChatLoading: (state, action) => {
            state.isLoadingChatbot = false
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchSummData.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchSummData.fulfilled,(state, action)=>{
            state.summaryData = action.payload.data.data;
            state.isLoading = false;
        });
        builder.addCase(fetchSummData.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload
        });

        builder.addCase(fetchChatBotDataRedux.pending,(state)=>{
            state.isLoadingChatbot = true;
        });
        builder.addCase(fetchChatBotDataRedux.fulfilled,(state, action)=>{
            state.chatbotData = action.payload.data.result.chatHistory;
            state.isLoadingChatbot = false;
        });
        builder.addCase(fetchChatBotDataRedux.rejected,(state, action)=>{
            state.isLoadingChatbot = false;
            state.error = action.payload
        });

        builder.addCase(fetchPdfSummaryRedux.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchPdfSummaryRedux.fulfilled,(state, action)=>{
            state.summary = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(fetchPdfSummaryRedux.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload
        });

        builder.addCase(fetchChatBotSuggestionDataRedux.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchChatBotSuggestionDataRedux.fulfilled,(state, action)=>{
            state.suggestions = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(fetchChatBotSuggestionDataRedux.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload
        });

        builder.addCase(fetchRecommendationApiRedux.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchRecommendationApiRedux.fulfilled,(state, action)=>{
            state.recommendation = action.payload.data.data;
            state.isLoading = false;
        });
        builder.addCase(fetchRecommendationApiRedux.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload
        });
    }
})

export const fetchSummData =createAsyncThunk(
    "fetchSummData",
    async (payload,thunkAPI) =>{
        try {
            const res = await api.fetchSummData(payload);
            return res;
        } catch (error) {
        
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const fetchChatBotDataRedux =createAsyncThunk(
    "fetchChatBotDataRedux",
    async (payload,thunkAPI) =>{
        try {
            const res = await api.fetchChatBotDataApi(payload);
            return res;
        } catch (error) {
        
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const fetchPdfSummaryRedux =createAsyncThunk(
    "fetchPdfSummaryRedux",
    async (payload,thunkAPI) =>{
        try {
            const res = await api.fetchPdfSummaryApi(payload);
            return res;
        } catch (error) {
        
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const fetchChatBotSuggestionDataRedux =createAsyncThunk(
    "fetchChatBotSuggestionDataRedux",
    async (payload,thunkAPI) =>{
        try {
            const res = await api.fetchChatBotSuggestionDataApi(payload);
            return res;
        } catch (error) {
        
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const fetchRecommendationApiRedux =createAsyncThunk(
    "fetchRecommendationApiRedux",
    async (payload,thunkAPI) =>{
        try {
            const res = await api.fetchChatBotRecommendationApi(payload);
            return res;
        } catch (error) {
        
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

// Action creators are generated for each case reducer function
export const { updateSummaryData,resetChatLoading} = summarySlice.actions

export const summaryData = (state) => state.summary.summaryData

export default summarySlice.reducer