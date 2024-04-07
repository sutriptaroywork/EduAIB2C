import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiService";

// Async Thunks
export const fetchGreetingData = createAsyncThunk(
  "fetchGreetingData",
  async (payload, thunkAPI) => {
    try {
      const res = await api.fetchGreetingData(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchWeeklyData = createAsyncThunk(
  "fetchWeeklyData",
  async (payload, thunkAPI) => {
    try {
      const res = await api.fetchWeeklyData(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProgressData = createAsyncThunk(
  "fetchProgressData",
  async (payload, thunkAPI) => {
    try {
      const res = await api.fetchProgressData(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchStickyData = createAsyncThunk(
    "fetchStickyData",
    async (payload, thunkAPI) => {
      try {
        const res = await api.fetchStickyData(payload);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

// Combined Slice
const dashboardSlice = createSlice({
  name: "combined",
  initialState: {
    greeting: {
      data: null,
      isLoading: false,
      error: null,
    },
    weeklyhrSpent: {
      data: null,
      isLoading: false,
      error: null,
    },
    progressChart: {
      data: null,
      isLoading: false,
      error: null,
    },
    stickyData: {
        data: null,
        isLoading: false,
        error: null,
      },
  },
  extraReducers: (builder) => {
    // Greeting Data
    builder.addCase(fetchGreetingData.pending, (state) => {
      state.greeting.isLoading = true;
    });
    builder.addCase(fetchGreetingData.fulfilled, (state, action) => {
      state.greeting.data = action.payload.data;
      state.greeting.isLoading = false;
    });
    builder.addCase(fetchGreetingData.rejected, (state, action) => {
      state.greeting.isLoading = false;
      state.greeting.error = action.payload;
    });

    // Weekly Data
    builder.addCase(fetchWeeklyData.pending, (state) => {
      state.weeklyhrSpent.isLoading = true;
    });
    builder.addCase(fetchWeeklyData.fulfilled, (state, action) => {
      state.weeklyhrSpent.data = action.payload.data;
      state.weeklyhrSpent.isLoading = false;
    });
    builder.addCase(fetchWeeklyData.rejected, (state, action) => {
      state.weeklyhrSpent.isLoading = false;
      state.weeklyhrSpent.error = action.payload;
    });

    // Progress Data
    builder.addCase(fetchProgressData.pending, (state) => {
      state.progressChart.isLoading = true;
    });
    builder.addCase(fetchProgressData.fulfilled, (state, action) => {
      state.progressChart.data = action.payload.data;
      state.progressChart.isLoading = false;
    });
    builder.addCase(fetchProgressData.rejected, (state, action) => {
      state.progressChart.isLoading = false;
      state.progressChart.error = action.payload;
    });

    // Sticky Data
    builder.addCase(fetchStickyData.pending, (state) => {
        state.stickyData.isLoading = true;
      });
      builder.addCase(fetchStickyData.fulfilled, (state, action) => {
        state.stickyData.data = action.payload.data;
        state.stickyData.isLoading = false;
      });
      builder.addCase(fetchStickyData.rejected, (state, action) => {
        state.stickyData.isLoading = false;
        state.stickyData.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
