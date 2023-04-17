import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  downloadHistory: [],
};

const downloadsSlice = createSlice({
  name: "downloads",
  initialState,
  reducers: {
    STORE_DOWNLOADS(state, action) {
      state.downloadHistory = action.payload;
    },
  },
});

export const { STORE_DOWNLOADS } = downloadsSlice.actions;

// updated selector function
export const selectDownloadHistory = (state) => state.downloads.downloadHistory;


export default downloadsSlice.reducer;
