import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiService";

const coinSlice = createSlice({
  name: "coinData",
  initialState: {
    tokenUsage: null,
    tokenPlans: null,
    tokenCoupans: null,
    totalToken: null,
    isLoggedIn: false,
    isLoading: false,
    error: {},
  },
  extraReducers: (builder) => {
    // token plans
    builder.addCase(tokenPlans.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tokenPlans.fulfilled, (state, action) => {
      state.tokenPlans = action.payload.data.data;
      state.isLoading = false;
    });
    builder.addCase(tokenPlans.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // total Token
    builder.addCase(totalToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(totalToken.fulfilled, (state, action) => {
      state.tokenUsage = action.payload.data.data;
      state.isLoading = false;
    });
    builder.addCase(totalToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // month token
    builder.addCase(checkTokenCoupan.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkTokenCoupan.fulfilled, (state, action) => {
      state.tokenCoupans = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(checkTokenCoupan.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// token Plans

export const tokenPlans = createAsyncThunk(
  "tokenPlans",
  async (payload, thunkAPI) => {
    try {
      const res = await api.getTokenPlansApi(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// totalToken

export const totalToken = createAsyncThunk(
  "totalToken",
  async (payload, thunkAPI) => {
    try {
      if (payload) {
        const res = await api.getTotalTokenTillNowAPi(payload);
        return res;
      }
      const res = await api.getTotalTokenTillNowAPi();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// token coupan

export const checkTokenCoupan = createAsyncThunk(
  "checkTokenCoupan",
  async (payload, thunkAPI) => {
    try {
      const res = await api.checkCoupanCode(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export default coinSlice.reducer;

