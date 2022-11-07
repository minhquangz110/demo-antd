import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { HeatMapOutlined } from "@ant-design/icons";
export interface ICartItem {
  _id: string;
  name: string;
  price: number;
  oldPrice: number;
  imgs: string[];
  quantity: number;
  subtotal: number;
}

const initialState: ICartItem[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const cartItem = state.find((p) => p._id === id);
      if (cartItem) {
        if (cartItem.quantity + quantity > 0) {
          cartItem.quantity += quantity;
          cartItem.subtotal = cartItem.quantity * cartItem.price;
        }
      }
    },
    addToCart: (state, action) => {
      const data = action.payload;
      const cartItem = state.find((p) => p._id === data._id);
      if (cartItem) {
        cartItem.quantity += data.quantity;
        cartItem.subtotal = cartItem.quantity * cartItem.price;
      } else {
        state.push(data);
      }
    },
    removeProduct: (state, action) => {
      console.log(state.length);
      const { id } = action.payload;
      return state.filter((product) => product._id !== id);
    },
  },
});
export const { updateQuantity, removeProduct, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
