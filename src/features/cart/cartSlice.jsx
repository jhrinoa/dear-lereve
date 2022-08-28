import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, selectedColor, selectedSize, mainImg, name } = action.payload;
      const itemId = [id, selectedColor, selectedSize].join('/');

      const itemInCart = state.cart.find((item) => item.itemId === itemId);

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({
          itemId,
          quantity: 1,
          mainImg,
          name,
          selectedColor,
          selectedSize,
        });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.itemId === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.itemId === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const cart = state.cart.filter((item) => item.itemId !== action.payload);
      state.cart = cart;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const getTotal = (state) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  state.cart.cart.forEach((item) => {
    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });
  return { totalPrice, totalQuantity };
};
