import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPlantDetails } from "../Actions/plantActions";

const PlantDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const plantDetails = useSelector((state) => state.plantDetails);
  const { plant } = plantDetails;

  useEffect(() => {
    dispatch(listPlantDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?cartQty=${quantity}`);
  };

  return (
    <div className="items-start justify-center px-4 py-10 md:flex 2xl:px-20 md:px-6p-5 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-[12%] my-[3%]">
      <div className="hidden xl:w-2/6 lg:w-2/5 w-80 md:block">
        <img className="w-full" alt={plant.name} src={plant.image} />
      </div>
      <div className="mt-6 xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0">
        <div className="pb-6 border-b border-gray-200">
          <p className="text-sm leading-none text-gray-400">
            Plant Cultivar Collection
          </p>
          <h1 className="mt-4 text-xl font-semibold leading-7 text-white lg:text-2xl lg:leading-6">
            {plant.name}
          </h1>
        </div>

        <div>
          <p className="text-base leading-normal text-gray-400 xl:pr-48 lg:leading-tight mt-7">
            {plant.description}
          </p>
          <p className="text-base leading-4 text-gray-400 mt-7">
            Price: ${plant.price}
          </p>
          <p className="mt-4 text-base leading-4 text-gray-400">
            {plant.quantity > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <br></br>
        <br></br>

        {plant.quantity > 0 && (
          <form
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className=""
          >
            <select className="inline-flex px-3 py-2 mr-[20%] text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
              {[...Array(plant.quantity).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            {plant.quantity > 0 ? (
              <button
                onClick={addToCartHandler}
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg dark:bg-green-500 dark:hover:bg-stone-400 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <svg
                  aria-hidden="true"
                  class="mr-2 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                ADD TO CART
              </button>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
};

export default PlantDetailsPage;
