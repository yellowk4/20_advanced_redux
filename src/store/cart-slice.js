import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQuantity: 0, changed: false }, //changed는 장바구니에 변경이 있었는지 여부를 나타냅니다.
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload; // payload는 새로 추가할 항목의 정보를 담고 있습니다.
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        // 장바구니에 새로운 항목을 추가하는 경우
        state.items.push({
          // 기존 배열을 조작하기 때문에 불변성을 지키지 않지만 Redux Toolkit은 이를 처리해줍니다.
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        // 수량이 한 개일 경우 항목을 삭제합니다.
        state.items = state.items.filter((item) => item.id !== id); // id와 일치하지 않는 항목만 남깁니다.
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
