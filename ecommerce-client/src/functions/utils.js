export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const addToCart = (currentState, item) => {
    const updatedState = { ...currentState }; 

    const existItem = updatedState.cartItems.find((x) => x._id === item._id);
    if (existItem) {
        updatedState.cartItems = updatedState.cartItems.map((x) =>
            x._id === existItem._id ? { ...x, qty: x.qty + 1 } : x
        );
    } else {
        updatedState.cartItems = [...updatedState.cartItems, { ...item, qty: 1 }];
    }

    updatedState.itemsPrice = addDecimals(
        updatedState.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    // Calculate the shipping price
    updatedState.shippingPrice = addDecimals(updatedState.itemsPrice > 100 ? 0 : 10);
        
    // Calculate the tax price
    updatedState.taxPrice = addDecimals(Number((0.15 * updatedState.itemsPrice).toFixed(2)));

    // Calculate the total price
    updatedState.totalPrice = (
        Number(updatedState.itemsPrice) +
        Number(updatedState.shippingPrice) +
        Number(updatedState.taxPrice)
    ).toFixed(2);


    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedState));
    return updatedState;
};
