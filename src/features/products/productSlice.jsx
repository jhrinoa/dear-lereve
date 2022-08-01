import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ui',
  initialState: { lastViewedProductId: '' },
  reducers: {
    setLastViewedProductId: (state, { payload }) => {
      state.lastViewedProductId = payload;
    },
  },
});

export const { setLastViewedProductId } = slice.actions;

export default slice.reducer;

export const selectLastViewedProductId = (state) =>
  state.ui.lastViewedProductId;
