import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchQuery, PropertyType } from '../types';

interface FilterState {
  query: SearchQuery;
}

const initialState: FilterState = {
  query: {
    type: 'all',
    minPrice: 0,
    maxPrice: 2000000,
    location: '',
    amenities: [],
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<Partial<SearchQuery>>) => {
      state.query = { ...state.query, ...action.payload };
    },
    resetFilters: (state) => {
      state.query = initialState.query;
    },
    toggleAmenity: (state, action: PayloadAction<string>) => {
      const amenities = state.query.amenities || [];
      if (amenities.includes(action.payload)) {
        state.query.amenities = amenities.filter((a) => a !== action.payload);
      } else {
        state.query.amenities = [...amenities, action.payload];
      }
    },
  },
});

export const { setSearchQuery, resetFilters, toggleAmenity } = filterSlice.actions;
export default filterSlice.reducer;
