import { atom } from 'recoil'

const initialState = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const currentUserState = atom({
  key: 'currentUserState',
  default: initialState
});