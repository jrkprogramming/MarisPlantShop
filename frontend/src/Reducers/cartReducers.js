export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.plant === item.plant);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.plant === existItem.plant ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case "CART_REMOVE_ITEM":
      return {
        // action.payload is the id of the plant that we want to remove
        ...state,
        cartItems: state.cartItems.filter((x) => x.plant !== action.payload),
      };

    case "CART_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "CART_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case "CART_REMOVE":
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
