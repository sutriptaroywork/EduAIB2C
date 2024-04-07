import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiService";

// Async Thunks
export const postChatBotData = createAsyncThunk(
  "postChatBotData",
  async ({ assignedCode, payload }, thunkAPI) => {
    try {
      const res = await api.postChatBotData(assignedCode, payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postPdfSummary = createAsyncThunk(
  "postPdfSummary",
  async ({ assignedCode, payload }, thunkAPI) => {
    try {
      const res = await api.postPdfSummary(assignedCode, payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getChatBotSuggestionData = createAsyncThunk(
  "getChatBotSuggestionData",
  async (assignedCode, thunkAPI) => {
    try {
      const res = await api.getChatBotSuggestionData(assignedCode);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Combined Slice
const chatBotSlice = createSlice({
  name: "chatBotSlice",
  initialState: {
    chatBotData: null,
    pdfSummary: null,
    chatBotSuggestionData: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // Chat Bot Data
    builder.addCase(postChatBotData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postChatBotData.fulfilled, (state, action) => {
      state.chatBotData = action.payload;
      state.loading = false;
    });
    builder.addCase(postChatBotData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // PDF Summary
    builder.addCase(postPdfSummary.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postPdfSummary.fulfilled, (state, action) => {
      state.pdfSummary = action.payload;
      state.loading = false;
    });
    builder.addCase(postPdfSummary.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Chat Bot Suggestion Data
    builder.addCase(getChatBotSuggestionData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChatBotSuggestionData.fulfilled, (state, action) => {
      state.chatBotSuggestionData = action.payload;
      state.loading = false;
    });
    builder.addCase(getChatBotSuggestionData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default chatBotSlice.reducer;
