import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { savePaymentMethod } from "../../Actions/cartActions";

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="p-20 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-[30%] my-[5%]">
      <form onSubmit={handleSubmit}>
        <h2 className="mt-0 mb-2 text-5xl font-medium leading-tight text-neutral-100">
          Select Payment Method:
        </h2>
        <br></br>
        <label
          for="paymentMethod"
          className="mt-0 mb-2 text-2xl font-medium leading-tight text-neutral-100"
        >
          Credit Card:
        </label>
        <input
          type="radio"
          value="card"
          name="paymentMethod"
          checked
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <br></br>
        <label
          for="paymentMethod"
          className="mt-0 mb-2 text-2xl font-medium leading-tight text-neutral-100"
        >
          Cash:
        </label>
        <input
          type="radio"
          value="cash"
          name="paymentMethod"
          checked
          onChange={(e) => setPaymentMethod(e.target.value)}
        />

        <br></br>

        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-blue-600 dark:bg-green-500 dark:hover:bg-stone-400 mt-10"
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
