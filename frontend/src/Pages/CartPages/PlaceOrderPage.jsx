import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { orderCreate } from "../../Actions/orderActions";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createOrder = useSelector((state) => state.createOrder);
  const { order, success } = createOrder;

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.cartQty,
    0
  );

  /// Shipping Price is also Delivery Charge

  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);

  cart.taxPrice = Number(0.075 * cart.itemsPrice).toFixed(2);

  // Add Shipping Charge when applicable
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(
    2
  );

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  useEffect(() => {
    if (success) {
      navigate(`/orders/${order.id}`);
      dispatch({ type: "ORDER_RESET" });
    }
  }, [success, navigate, order?.id]);

  const placeOrder = () => {
    console.log(cart.cartItems);
    dispatch(
      orderCreate({
        orderItems: cart?.cartItems,
        shippingAddress: cart?.shippingAddress,
        paymentMethod: cart?.paymentMethod,
        itemsPrice: cart?.itemsPrice,
        shippingPrice: cart?.shippingPrice,
        taxPrice: cart?.taxPrice,
        totalPrice: cart?.totalPrice,
      })
    );
  };

  return (
    <div>
      <div
        class="rounded-lg mt-[5%] ml-[10%] w-[80%] h-[80%] bg-black dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
        id="chec-div"
      >
        <div
          class="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
          id="checkout"
        >
          <div
            class="flex items-end lg:flex-row flex-col justify-center"
            id="cart"
          >
            <div
              class="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-y-auto overflow-x-hidden lg:h-screen h-auto"
              id="scroll"
            >
              <div
                class="flex items-center text-gray-500 hover:text-gray-600 dark:text-white cursor-pointer"
                onclick="checkoutHandler(false)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-chevron-left"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
                <a
                  href="plants/"
                  class="text-sm pl-2 leading-none dark:hover:text-gray-200"
                >
                  Browse
                </a>
              </div>
              <p class="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">
                Review Order
              </p>
              <br></br>

              {cart?.cartItems?.map((item) => (
                <div class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
                  <div class="md:w-4/12 2xl:w-1/4 w-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      class="h-full object-center object-cover md:block hidden"
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      class="md:hidden w-full h-full object-center object-cover"
                    />
                  </div>
                  <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                    <p class="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">
                      Item #: {item.plant}
                    </p>
                    <div class="flex items-center justify-between w-full pt-1">
                      <p class="text-base font-black leading-none text-gray-800 dark:text-white">
                        {item.name}
                      </p>

                      <br></br>
                      <br></br>
                    </div>

                    <p class="w-96 text-xs leading-3 text-gray-600 dark:text-white">
                      Quantity: {item.cartQty}
                    </p>
                    <div class="flex items-center justify-between pt-5">
                      <p class="text-base font-black leading-none text-gray-800 dark:text-white">
                        {item.cartQty} x ${item.price} = $
                        {(item.price * item.cartQty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full">
              <div class="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
                <div>
                  <p class="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">
                    Summary
                  </p>
                  <div class="flex items-center justify-between pt-16">
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      # of Items
                    </p>
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      {cart.cartItems.reduce(
                        (acc, item) => acc + item.cartQty,
                        0
                      )}
                    </p>
                  </div>
                  <div class="flex items-center justify-between pt-5">
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      Shipping
                    </p>
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      {!cart.cartItems.shippingAddress ? "N/A" : "$10.00"}
                    </p>
                  </div>
                  <div class="flex items-center justify-between pt-5">
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      Tax:{" "}
                    </p>
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      ${cart.taxPrice}
                    </p>
                  </div>
                  <div class="flex items-center justify-between pt-5 ">
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      Subtotal
                    </p>
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      $
                      {cart.cartItems
                        .reduce(
                          (acc, item) => acc + item.cartQty * item.price,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>

                  <div class="flex items-center justify-between pt-5">
                    <p class="leading-none text-gray-800 dark:text-white text-4xl">
                      Total
                    </p>
                    <p class="leading-none text-gray-800 dark:text-white text-5xl">
                      ${cart.totalPrice}
                    </p>
                  </div>

                  <br></br>
                  {cart.cartItems === 0 ? null : (
                    <button
                      class="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
                      type="button"
                      onClick={placeOrder}
                    >
                      PLACE ORDER
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
