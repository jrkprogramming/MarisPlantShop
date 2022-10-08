import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Actions/cartActions";

const CartPage = () => {
  let { id } = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const plantId = id;
  const cartQty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);

  useEffect(() => {
    if (plantId) {
      dispatch(addToCart(plantId, cartQty));
    }
    // Adds plants to localstorage
    // quantity is totalQuantity, cartQty is how many in the cart
  }, [dispatch, plantId, cartQty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=deliveryMethod");
    navigate("/deliveryMethod");
  };

  return (
    <div>
      <div
        class="rounded-lg mt-[5%] ml-[10%] w-[80%] h-[80%] bg-black dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed "
        id="chec-div"
      >
        <div
          class="w-full z-10 right-0 h-auto overflow-x-hidden overflow-y-auto transform translate-x-0 transition ease-in-out duration-700"
          id="checkout"
        >
          <div
            class="flex items-end lg:flex-row flex-col justify-center h-auto"
            id="cart"
          >
            <div
              class="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-y-auto overflow-x-hidden lg:h-screen h-auto"
              id="scroll"
            >
              <div class="flex items-center text-gray-500 hover:text-gray-600 dark:text-white cursor-pointer ">
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
                <button
                  href="/plants"
                  class="text-sm pl-2 leading-none dark:hover:text-gray-200"
                >
                  Browse
                </button>
              </div>

              <p class="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">
                Shopping Cart
              </p>
              <br></br>

              {cartItems?.map((item) => (
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

                      <form
                        className="flex inline-flex"
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.plant, Number(e.target.value))
                          )
                        }
                      >
                        <select
                          aria-label="Select quantity"
                          value={item.cartQty}
                          class="py-2 px-1 border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                        >
                          {[...Array(item.quantity).keys()].map((index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </select>
                      </form>
                    </div>
                    <p class="w-96 text-xs leading-3 text-gray-600 dark:text-white">
                      Quantity: {item.cartQty}
                    </p>
                    <div class="flex items-center justify-between pt-5">
                      <div class="flex itemms-center">
                        <button
                          class="text-xs leading-3 underline text-red-500 cursor-pointer"
                          onClick={() => removeFromCartHandler(item.plant)}
                        >
                          Remove
                        </button>
                      </div>
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
                      {cartItems.reduce((acc, item) => acc + item.cartQty, 0)}
                    </p>
                  </div>
                  <div class="flex items-center justify-between pt-5">
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      Shipping
                    </p>
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      {!cartItems.shippingAddress ? "N/A" : "$10.00"}
                    </p>
                  </div>
                  <div class="flex items-center justify-between pt-5 ">
                    <p class=" leading-none text-gray-800 dark:text-white text-3xl">
                      Subtotal
                    </p>
                    <p class=" leading-none text-gray-800 dark:text-white text-5xl">
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.cartQty * item.price,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                  <br></br>
                  <button
                    onClick={checkoutHandler}
                    class="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
