import axios from "axios";

export const addToCart = (id, cartQty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/plants/${id}`)

    dispatch({
        type: 'CART_ADD_ITEM',
        payload:{
            plant:data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            quantity: data.quantity,
            cartQty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: 'CART_REMOVE_ITEM',
        payload: id, 
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: 'CART_SHIPPING_ADDRESS',
        payload: data, 
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: 'CART_PAYMENT_METHOD',
        payload: data, 
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}