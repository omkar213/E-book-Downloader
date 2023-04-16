import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/config';


export const fetchSubscribers = createAsyncThunk(
  'subscribers/fetchSubscribers',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'newsletterSubcribers'));
    const subscribers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return subscribers;
  },
);

const subscribersSlice = createSlice({
  name: 'subscribers',
  initialState: {
    subscribers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscribers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subscribers = action.payload;
      })
      .addCase(fetchSubscribers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectSubscribers = (state) => state.subscribers.subscribers;
export const selectSubscribersStatus = (state) => state.subscribers.status;
export const selectSubscribersError = (state) => state.subscribers.error;

export default subscribersSlice.reducer;
