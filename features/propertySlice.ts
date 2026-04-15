import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Property, SearchQuery } from '../types';
import { fetchProperties, fetchFeaturedProperties } from '../lib/api';

interface PropertyState {
  properties: Property[];
  featuredProperties: Property[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  featuredProperties: [],
  status: 'idle',
  error: null,
};

export const getProperties = createAsyncThunk(
  'properties/getProperties',
  async (query: SearchQuery | undefined) => {
    const response = await fetchProperties(query);
    return response;
  }
);

export const getFeaturedProperties = createAsyncThunk(
  'properties/getFeaturedProperties',
  async () => {
    const response = await fetchFeaturedProperties();
    return response;
  }
);

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProperties.fulfilled, (state, action: PayloadAction<Property[]>) => {
        state.status = 'succeeded';
        state.properties = action.payload;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch properties';
      })
      .addCase(getFeaturedProperties.fulfilled, (state, action: PayloadAction<Property[]>) => {
        state.featuredProperties = action.payload;
      });
  },
});

export default propertySlice.reducer;
