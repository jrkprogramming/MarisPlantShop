import axios from 'axios';

export const login = (username, password) => async (dispatch) => {

    const config = {
        headers:{
            'Content-type' : 'application/json'
        }
    }

    const {data} = await axios.post(
        '/users/login/',
        {'username': username, 'password': password},
        config
        )
    dispatch({
        type: 'USER_LOGIN',
        payload: data
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: 'USER_LOGOUT'})
    dispatch({type: 'USER_DETAILS_RESET'})

    dispatch({type: 'USER_LIST_LOGOUT'})
    dispatch({type: 'ORDER_LIST_RESET'})
}


export const signup = (username, email, first_name, last_name, password) => async (dispatch) => {

    const config = {
        headers:{
            'Content-type' : 'application/json'
        }
    }

    const {data} = await axios.post(
        '/users/signup/',
        {'username': username, 'email': email, 'first_name': first_name, 'last_name': last_name, 'password': password},
        config
        )

    dispatch({
        type: 'USER_SIGNUP',
        payload: data
    })

    dispatch({
        type: 'USER_LOGIN',
        payload: data
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
}


export const getUserDetails = (id) => async (dispatch, getState) => {

    const { 
        userLogin: {userInfo}
    } = getState()


    const config = {
        headers:{
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const {data} = await axios.get(
        `/users/${id}/`,
        config
        )
        
    dispatch({
        type: 'USER_DETAILS',
        payload: data
    })
}

export const editUserInfo = (user) => async (dispatch, getState) => {

    const { 
        userLogin: {userInfo}
    } = getState()


    const config = {
        headers:{
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const {data} = await axios.put(
        `/users/profile/edit/`,
        user,
        config
        )
        
    dispatch({
        type: 'USER_EDIT',
        payload: data
    })

    dispatch({
        type: 'USER_LOGIN',
        payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
}


// export const listUsers = () => async (dispatch, getState) => {

//     const { 
//         userLogin: {userInfo}
//     } = getState()


//     const config = {
//         headers:{
//             'Content-type' : 'application/json',
//             Authorization: `Bearer ${userInfo.token}`
//         }
//     }

//     const {data} = await axios.get(
//         `/users/`,
//         config
//         )
        
//     dispatch({
//         type: 'USER_LIST',
//         payload: data
//     })
// }