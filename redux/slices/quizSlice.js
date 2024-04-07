import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiService";

// Async Thunks
export const fetchEasyQuestionData = createAsyncThunk(
  "quiz/fetchEasyQuestionData",
  async (assignedCode, thunkAPI) => {
    try {
      const response = await api.fetchEasyQuestionData(assignedCode);
      return response.data; // Assuming the response contains data property
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchMedQuestionData = createAsyncThunk(
  "quiz/fetchMedQuestionData",
  async (assignedCode, thunkAPI) => {
    try {
      const response = await api.fetchMedQuestionData(assignedCode);
      return response.data; // Assuming the response contains data property
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchHardQuestionData = createAsyncThunk(
  "quiz/fetchHardQuestionData",
  async (assignedCode, thunkAPI) => {
    try {
      const response = await api.fetchHardQuestionData(assignedCode);
      return response.data; // Assuming the response contains data property
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Combined Slice
const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    easyQuestions: null,
    medQuestions: null,
    hardQuestions: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // Easy Questions
    builder.addCase(fetchEasyQuestionData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEasyQuestionData.fulfilled, (state, action) => {
      state.easyQuestions = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchEasyQuestionData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Medium Questions
    builder.addCase(fetchMedQuestionData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMedQuestionData.fulfilled, (state, action) => {
      state.medQuestions = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMedQuestionData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Hard Questions
    builder.addCase(fetchHardQuestionData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHardQuestionData.fulfilled, (state, action) => {
      state.hardQuestions = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchHardQuestionData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default quizSlice.reducer;
