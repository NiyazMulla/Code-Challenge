export const getCartItems = () => {
  if (sessionStorage.getItem("cartItems")) {
    let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    return cartItems;
  }

  return [];
};

export const getTotalPrice = () => {
  let totalAmount = 0;
  if (sessionStorage.getItem("cartItems")) {
    let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    for (let i = 0; i < cartItems.length; i++) {
      const element = cartItems[i];
      totalAmount = parseFloat(totalAmount) + element.total;
    }
  }
  return totalAmount;
};
