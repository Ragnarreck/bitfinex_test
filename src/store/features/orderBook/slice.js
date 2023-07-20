import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSubscribed: false,
  channelId: null,
  precision: null,
  frequency: null,
  data: [],

  // "chanId": 16859,
  // "prec": "P0",
  // "freq": "F0",
  // "len": "25",
  // "pair": "BTCUSD"
}

export const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState,
  reducers: {
    changeIsSubscribed: (state, action) => {
      state.isSubscribed = action.payload
    },
    changeChannelId: (state, action) => {
      console.log('SETTING chan ID', action.payload)
      state.channelId = action.payload
    },
    changePrecision: (state, action) => {
      state.precision = action.payload
    },
    changeFrequency: (state, action) => {
      state.frequency = action.payload
    },
    setInitialOrdersData: (state, action) => {
      // filter out items with negative amount
      state.data = action.payload?.filter(it => it?.[2] > 0)
    },
    updateOrdersData: (state, action) => {
      const [price, orders, amount] = action.payload;
      const indexOfItemWhichShouldBeUpdated = state.data?.findIndex(it => it[0] === price);
      if (indexOfItemWhichShouldBeUpdated !== -1) {
        state.data[indexOfItemWhichShouldBeUpdated] = action.payload;
      } else if (amount > 0) {
        state.data.push(action.payload);
      }
    },
    resetOrderBookState: (state) => {
      state.channelId = null;
      state.data = [];
      state.frequency = null;
      state.isSubscribed = false;
      state.precision = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeIsSubscribed, changeChannelId, changePrecision, changeFrequency, setInitialOrdersData, updateOrdersData, resetOrderBookState } = orderBookSlice.actions

export default orderBookSlice.reducer