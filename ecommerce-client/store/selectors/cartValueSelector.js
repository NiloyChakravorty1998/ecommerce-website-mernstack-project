import { selector } from "recoil";
import { cartState } from "../atoms/cartState";
import { addDecimals } from "../../src/functions/utils";

export const cartValueSelector = selector({
    key: 'cartValueSelector',
    get: ({ get }) => {
        const cartSt = get(cartState); 
        const cart = {...cartSt};
        cart.itemsPrice = addDecimals(
            cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
    
        // Calculate the shipping price
        cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
            
        // Calculate the tax price
        cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    
        // Calculate the total price
        cart.totalPrice = (
            Number(cart.itemsPrice) +
            Number(cart.shippingPrice) +
            Number(cart.taxPrice)
        ).toFixed(2);
    
        // Save the cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    },
});