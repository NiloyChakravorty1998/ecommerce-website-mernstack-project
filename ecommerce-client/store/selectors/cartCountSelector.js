import { selector } from "recoil";
import { cartState } from "../atoms/cartState";

export const cartCountSelector = selector({
    key: 'cartCountSelector',
    get: ({ get }) => {
        const cart = get(cartState); 
        const itemCount = cart.cartItems.reduce((count, item) => count + item.qty, 0);
        return itemCount;
    },
});