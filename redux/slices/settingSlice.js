import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiService";

// Async Thunks
export const fetchInstituteData = createAsyncThunk(
  "fetchInstituteData",
  async ({ state, city }, thunkAPI) => {
    try {
      const res = await api.fetchInstituteData(state, city);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postProfileData = createAsyncThunk(
  "postProfileData",
  async (payload, thunkAPI) => {
    try {
      const res = await api.postProfileData(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (payload, thunkAPI) => {
    try {
      const res = await api.changePassword(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postNotification = createAsyncThunk(
  "postNotification",
  async (payload, thunkAPI) => {
    try {
      const res = await api.postNotification(payload);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchNotificationData = createAsyncThunk(
  "fetchNotificationData",
  async (payload, thunkAPI) => {
    try {
      const res = await api.fetchNotificationData();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchReferalCreditData = createAsyncThunk(
  "fetchReferalCreditData",
  async (payload, thunkAPI) => {
    try {
      const res = await api.fetchReferalCreditData();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Combined Slice
const settingSlice = createSlice({
    name: "settingSlice",
    initialState: {
      instituteData: null,
      profileData: null,
      passwordChangeStatus: null,
      notificationData: null,
      postNotification: null,
      referralCreditData: null,
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
        // Institute Data
        builder.addCase(fetchInstituteData.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(fetchInstituteData.fulfilled, (state, action) => {
          state.instituteData = action.payload;
          state.loading = false;
        });
        builder.addCase(fetchInstituteData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    
        // Profile Data
        builder.addCase(postProfileData.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(postProfileData.fulfilled, (state, action) => {
          state.profileData = action.payload;
          state.loading = false;
        });
        builder.addCase(postProfileData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    
        // Change Password
        builder.addCase(changePassword.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(changePassword.fulfilled, (state, action) => {
          state.passwordChangeStatus = action.payload;
          state.loading = false;
        });
        builder.addCase(changePassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    
        // Notification Data
        builder.addCase(fetchNotificationData.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(fetchNotificationData.fulfilled, (state, action) => {
          state.notificationData = action.payload;
          state.loading = false;
        });
        builder.addCase(fetchNotificationData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });

        //Post Notification
        builder.addCase(postNotification.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(postNotification.fulfilled, (state, action) => {
          state.postNotification = action.payload;
          state.loading = false;
        });
        builder.addCase(postNotification.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    
        // Referral Credit Data
        builder.addCase(fetchReferalCreditData.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(fetchReferalCreditData.fulfilled, (state, action) => {
          state.referralCreditData = action.payload;
          state.loading = false;
        });
        builder.addCase(fetchReferalCreditData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default settingSlice.reducer;
  
