import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { payOrder } from "../Actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [order, setOrder] = useState({});
  const [sdkReady, setSdkReady] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPaid = useSelector((state) => state.orderPaid);
  const { success: successPay } = orderPaid;

  const payPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_ID}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const handlePayment = (paymentMethod) => {
    dispatch(payOrder(id, paymentMethod));
  };

  useEffect(() => {
    axios
      .get(`/orders/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (!order?.isPaid) {
      if (!window.paypal) {
        payPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [id, userInfo.token, successPay]);

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
                  href="/plants"
                  class="text-sm pl-2 leading-none dark:hover:text-gray-200"
                >
                  Browse
                </a>
              </div>
              <p class="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">
                Order#: {order?.id}
              </p>
              <br></br>
              <p class="text-base font-black leading-none text-gray-800 dark:text-white">
                Thank you for shopping with Plant Cultivar!
              </p>
              <br></br>

              {order?.orderItems?.map((item) => (
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
                      Customer Name:
                    </p>
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      {order?.user?.first_name} {order?.user?.last_name}
                    </p>
                  </div>
                  <div class="flex items-center justify-between pt-16">
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      # of Items
                    </p>
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      {order?.orderItems?.reduce(
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
                      {!order?.orderItems?.shippingAddress ? "N/A" : "$10.00"}
                    </p>
                  </div>
                  <div class="flex items-center justify-between pt-5">
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      Tax:{" "}
                    </p>
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      ${order?.taxPrice}
                    </p>
                  </div>
                  <div class="flex items-center justify-between pt-5 ">
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      Subtotal
                    </p>
                    <p class="text-base leading-none text-gray-800 dark:text-white">
                      $
                      {order?.orderItems
                        ?.reduce(
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
                      ${order?.totalPrice}
                    </p>
                  </div>

                  <br></br>

                  {order?.isPaid ? (
                    <div>
                      <h3 className="text-sm leading-none text-green-800 text-s dark:text-green">
                        This order was paid on {order?.paid_At}
                      </h3>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg leading-none text-red-800 text-s dark:text-red">
                        THIS ORDER HAS NOT YET BEEN PAID
                      </h3>
                      <br></br>
                      <PayPalButton
                        amount={order?.totalPrice}
                        onSuccess={handlePayment}
                      />
                    </div>
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

export default OrderDetailsPage;
