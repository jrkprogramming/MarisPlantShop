import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {listPlants, deletePlant, createPlant} from '../../Actions/plantActions'

const PlantListPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const plantList = useSelector(state => state.plantList)
  const {plants, error, pages, page} = plantList

  const plantDelete = useSelector(state => state.plantDelete)
  const {success: successDelete, error: errorDelete} = plantDelete

  const plantCreate = useSelector(state => state.plantCreate)
  const {plant: createdPlant, success: successCreate, error: errorCreate} = plantCreate

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {
    dispatch({type:'PLANT_CREATE_RESET'})

    if (!userInfo.is_staff) {
      alert('You are not authorized for this page')
      navigate('/users/login')
    }
    
    if(successCreate) {
      navigate(`/admin/plants/${createdPlant.id}/edit`)
    } else {
      dispatch(listPlants())
    }

}, [dispatch, successDelete, successCreate, createdPlant, navigate, userInfo])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      dispatch(deletePlant(id))
    } else {
      navigate('/users/login')
    }
  }

  const handleCreatePlant = () => {
    alert('A new plant was added!')
    dispatch(createPlant())
  }

  return (
    <div className="p-10 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-[30%] my-[5%]">
        
        <h1 className="mt-0 mb-2 text-5xl font-medium leading-tight text-neutral-100">List of Plants (Admin)</h1>

      <div className='flex flex-inline '>
        <button class="inline-flex items-center m-5 py-3 px-4 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-stone-400  dark:focus:ring-blue-800" onClick={handleCreatePlant}>ADD A PLANT</button>

        <a class="inline-flex items-center m-5 py-3 px-4 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-stone-400  dark:focus:ring-blue-800" href="/admin/orderlist">GO TO ORDERS</a>
      </div>


{plants.map(plant => (
<div class="max-w-sm w-100 lg:max-w-full lg:flex my-5">
  <div  class=" h-100 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Photo of Plant">

    <img src={plant.image} alt={plant.name} class="h-100 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"></img>

  </div>
  <div class="w-[100%] h-100 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-gray rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div class="mb-8">
      <p class="text-sm text-gray-600 flex items-center">
      PLANT #: {plant.id}
      </p>
      <br></br>
      <div class="text-white font-bold text-xl mb-2">{plant.name}</div>
      <p class="text-white text-base">Price: ${plant.price}</p>
      <p class="text-white text-base">In Stock: {plant.quantity}</p>
      <br></br>
  
    </div>

    <div>
    <a class="inline-flex items-center py-2 px-3 mx-[3%] text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-stone-400  dark:focus:ring-blue-800" href={`/admin/plants/${plant.id}/edit`}>EDIT</a>
  
    <button class="inline-flex items-center py-2 px-3 mx-[3%] text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-red-400  dark:focus:ring-blue-800" onClick={() => handleDelete(plant.id)}>REMOVE</button>
    </div>
   
  </div>
</div>
))}
    </div>
  )
}

export default PlantListPage