import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviews: [],
  isLoading: false,
};

export const addReview = createAsyncThunk("/review/addReview", async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
    data
  );
  return response.data;
});
export const getReviews = createAsyncThunk("/review/getReviews", async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/shop/review/${id}`
  );
  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally add the new review to the state
        state.reviews.push(action.payload); // Assuming the response contains the added review
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Failed to add review:", action.payload);
      });
  },
});

export default reviewSlice.reducer;