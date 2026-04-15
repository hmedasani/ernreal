import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '../features/propertySlice';
import filterReducer from '../features/filterSlice';
import wishlistReducer from '../features/wishlistSlice';

export const store = configureStore({
  reducer: {
    properties: propertyReducer,
    filters: filterReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
