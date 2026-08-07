import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  savedPropertyIds: string[];
}

const getInitialState = (): WishlistState => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      return { savedPropertyIds: JSON.parse(stored) };
    }
  }
  return { savedPropertyIds: [] };
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: getInitialState(),
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.savedPropertyIds.includes(id)) {
        state.savedPropertyIds = state.savedPropertyIds.filter(pid => pid !== id);
      } else {
        state.savedPropertyIds.push(id);
      }
      // Sync to local storage
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(state.savedPropertyIds));
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
