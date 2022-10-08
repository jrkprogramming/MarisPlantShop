import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPlants } from "../Actions/plantActions";
import Plant from "../Components/Plant";

const HomePage = () => {
  const dispatch = useDispatch();
  const plantList = useSelector((state) => state.plantList);
  const { plants } = plantList;

  useEffect(() => {
    dispatch(listPlants());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap justify-center p-10">
      {plants.map((plant) => (
        <p>
          <Plant plant={plant}></Plant>
        </p>
      ))}
    </div>
  );
};

export default HomePage;
