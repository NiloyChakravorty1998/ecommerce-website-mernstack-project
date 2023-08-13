import { atom } from 'recoil'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

export const cartState = atom({
  key: 'cartState',
  default: initialState,
});