import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DeliveryMethodPage = () => {
  const navigate = useNavigate();

  const handleDelivery = () => {
    navigate("/login?redirect=shipping");
    navigate("/shipping");
  };

  return (
    <div className="p-20 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-[30%] my-[5%]">
      <h2 className="mt-0 mb-2 text-5xl font-medium leading-tight text-neutral-100">
        CHOOSE YOUR DELIVERY METHOD
      </h2>

      <button
        type="button"
        onClick={handleDelivery}
        class="justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-stone-400 dark:hover:bg-stone-400 dark:focus:ring-blue-800"
        disabled
      >
        DELIVERY
      </button>

      <Link to="/payment">
        <button
          type="button"
          class="justify center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-green-500 dark:hover:bg-stone-400 dark:focus:ring-blue-800 m-10"
        >
          PICKUP
        </button>
      </Link>
    </div>
  );
};

export default DeliveryMethodPage;
