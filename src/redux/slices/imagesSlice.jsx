import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
  const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=30');
  return response.data;
});

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    favorites: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const imageId = action.payload;
      const isFavorited = state.favorites.includes(imageId);
      if (isFavorited) {
        state.favorites = state.favorites.filter((id) => id !== imageId);
      } else {
        state.favorites.push(imageId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite } = imagesSlice.actions;

export default imagesSlice.reducer;