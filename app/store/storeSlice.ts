import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    title: string;
    price:number;
    quantity: number;
    image: string;
  }

  interface cartState {
    items: CartItem[];
  };
  const initialState: cartState = {
    items: [],
  }

  const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
          addToCart:(state,{payload}:PayloadAction<CartItem>) => {
            const item = state.items.find(({id}) => id === payload.id);
            item ? item.quantity++ : state.items.push({...payload, quantity: 1});
          },
          removeFromCart:(state,{payload}:PayloadAction<number>) => {
            state.items = state.items.filter(({id}) => id !== payload);
          },
          clearCart:(state) => {
            state.items = [];
          },
    },
  });

  export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
  export default cartSlice.reducer;