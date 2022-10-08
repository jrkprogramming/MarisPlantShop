import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {listPlantDetails, editPlant} from '../../Actions/plantActions'

const PlantEditPage = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(0)

    const plantDetails = useSelector(state=> state.plantDetails)
    const {plant} = plantDetails


    const plantEdit = useSelector(state=> state.plantEdit)
    const {success:successfulEdit} = plantEdit

    useEffect(() =>{

        if(successfulEdit){
            dispatch({type: 'PLANT_EDIT_RESET'})
            navigate('/admin/plantList')
        } else {
            if (!plant.name || plant.id !== Number(id)) {
                dispatch(listPlantDetails(id))
            } else {
                setName(plant.name)
                setPrice(plant.price)
                setImage(plant.image)
                setDescription(plant.description)
                setQuantity(plant.quantity)
            }
        }

    }, [plant, id, navigate, dispatch, successfulEdit])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editPlant({
            id:id,
            name,
            price,
            image,
            description,
            quantity,

        }))
    }

    const handleImgUpload = async (e) => {
        const img = e.target.files[0]
        const formData = new FormData()

        console.log(img)
        console.log(formData)

        formData.append('image', img)
        formData.append('plant_id', id)


            const config = {
                headers: {'Content-type': 'multipart/form-data'}
            }

            const {data} = await axios.post('http://localhost:8000/plants/imgUpload/', formData, config)
            setImage(data)
            console.log('uploaded')

    }

  return (


    <div className="justify-center w-full max-w-lg m-auto mt-[3%] mb-[5%] bg-white border border-gray-200 rounded-lg shadow-md flexp-4 sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700" >

    <h2 className="text-3xl leading-tight font-sm text-neutral-100">Edit Plant ID#: {plant.id}</h2>
    <br></br><br></br>

    <img src={plant?.image} alt={plant?.name}></img>
    <br></br><br></br>

<form onSubmit={handleSubmit}>

  <div class="relative z-0 mb-6 w-full group">
      <input type="text" value={name} placeholder="" onChange={(e) => setName(e.target.value)} name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Plant Name</label>
  </div>
  <div class="relative z-0 mb-6 w-full group">
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
  </div>

  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 mb-6 w-full group">
        <input type="number" value={price} placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
    </div>
    <div class="relative z-0 mb-6 w-full group">
      

        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantity</label>
        

            <input type="number" value={quantity} placeholder="Enter price" onChange={(e) => setQuantity(e.target.value)} name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
        

    </div>
  </div>


  <div class="relative z-0 mb-6 w-full group">
      <input type="file" onChange={handleImgUpload} name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image</label>
  </div>

  <br></br>

  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-stone-400 dark:focus:ring-blue-800">UPDATE PLANT</button>
</form>
</div>

  )
}

export default PlantEditPage