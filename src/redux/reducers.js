import { createAction, createReducer } from "@reduxjs/toolkit";

const addToCart = createAction("addToCart");
const decrement = createAction("decrement");
const deleteFromCart = createAction("deleteFromCart");
const calculateSum = createAction("calculateSum");

const initialState = {
  cartItems: [],
  subTotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);

      if (isItemExist) {
        state.cartItems.forEach((i) => {
          if (i.id === item.id) i.quantity += 1;
        });
      } else {
        state.cartItems.push(item);
      }
    })
    .addCase(decrement, (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    })
    .addCase(deleteFromCart, (state, action) => {
      console.log("hi");
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    })
    .addCase(calculateSum, (state) => {
      let sum = 0;
      state.cartItems.forEach((i) => (sum += i.quantity * i.price));
      state.subTotal = sum;
      state.shipping =
        state.cartItems.length === 0 ? 0 : state.subTotal > 499 ? 0 : 200;
      state.tax = +(state.subTotal * 0.18).toFixed();
      state.total = state.subTotal + state.tax + state.shipping;
    });
});
