import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ui',
  initialState: { lastViewedProductName: '' },
  reducers: {
    setLastViewedProductName: (state, { payload }) => {
      state.lastViewedProductName = payload;
    },
  },
});

export const { setLastViewedProductName } = slice.actions;

export default slice.reducer;

export const selectLastViewedProductName = (state) =>
  state.ui.lastViewedProductName;
