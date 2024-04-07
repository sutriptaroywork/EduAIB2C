// redux/slices/maintenanceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../apiService";

export const maintenanceSlice = createSlice({
    name: "maintenance",
    initialState: {
        isMaintenanceMode: false,
    },

    extraReducers: (builder) => {
        
        builder.addCase(fetchMaintenanceMode.fulfilled, (state, action) => {
            state.isMaintenanceMode = action.payload;
        });
       
    },
});

export const fetchMaintenanceMode = createAsyncThunk(
    "fetchMaintenanceMode",
    async () => {
        const response = await api.fetchMaintenanceApi();
        const data = response?.data?.underMaintenance
        return data;
    },
);

export const { setMaintenanceMode } = maintenanceSlice.actions;

export const selectMaintenanceMode = (state) =>
    state?.maintenance?.isMaintenanceMode;

export default maintenanceSlice.reducer;
