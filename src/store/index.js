import { configureStore } from '@reduxjs/toolkit';
import orderBookReducer from './features/orderBook/slice';

export const store = configureStore({
  reducer: {
    orderBook: orderBookReducer
  },
})