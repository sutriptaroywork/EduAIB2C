import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiService";

// Async Thunks
export const fetchTodoData = createAsyncThunk(
  "fetchTodoData",
  async (payload, thunkAPI) => {
    try {
      const res = await api.fetchTodoData(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchReminderData = createAsyncThunk(
  "fetchReminderData",
  async (payload, thunkAPI) => {
    try {
      const res = await api.fetchReminderData(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchEventData = createAsyncThunk(
  "fetchEventData",
  async (payload, thunkAPI) => {
    try {
      const res = await api.fetchEventData(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Combined Slice
const tableSlice = createSlice({
  name: "tableSplice",
  initialState: {
    todo: {
      data: null,
      isLoading: false,
      error: null,
    },
    reminder: {
      data: null,
      isLoading: false,
      error: null,
    },
    event: {
      data: null,
      isLoading: false,
      error: null,
    },
  },
  extraReducers: (builder) => {
    // Todo Data
    builder.addCase(fetchTodoData.pending, (state) => {
      state.todo.isLoading = true;
    });
    builder.addCase(fetchTodoData.fulfilled, (state, action) => {
      state.todo.data = action.payload.data;
      state.todo.isLoading = false;
    });
    builder.addCase(fetchTodoData.rejected, (state, action) => {
      state.todo.isLoading = false;
      state.todo.error = action.payload;
    });

    // Reminder Data
    builder.addCase(fetchReminderData.pending, (state) => {
      state.reminder.isLoading = true;
    });
    builder.addCase(fetchReminderData.fulfilled, (state, action) => {
      state.reminder.data = action.payload.data;
      state.reminder.isLoading = false;
    });
    builder.addCase(fetchReminderData.rejected, (state, action) => {
      state.reminder.isLoading = false;
      state.reminder.error = action.payload;
    });

    // Event Data
    builder.addCase(fetchEventData.pending, (state) => {
      state.event.isLoading = true;
    });
    builder.addCase(fetchEventData.fulfilled, (state, action) => {
      state.event.data = action.payload.data;
      state.event.isLoading = false;
    });
    builder.addCase(fetchEventData.rejected, (state, action) => {
      state.event.isLoading = false;
      state.event.error = action.payload;
    });
  },
});

export default tableSlice.reducer;
