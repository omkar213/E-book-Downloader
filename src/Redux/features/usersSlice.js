import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/config";

export const fetchusers = createAsyncThunk("users/fetchusers", async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchusers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchusers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchusers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export const selectUsers = (state) => state.users.users;
export const selectUsersStatus = (state) => state.users.status;
export const selectusersError = (state) => state.users.error;

export default usersSlice.reducer;