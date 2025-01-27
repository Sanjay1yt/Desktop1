import axios from 'axios'

export const POST_DATA = 'POST_DATA';

export const USER_DATA = 'USER_DATA';

export const SEARCH_KEY = 'SEARCH_KEY';

export const SELECT_KEY = 'SELECT_KEY';

export const IS_LOADING = 'IS_LOADING'

export const updatePostData = (value) => ({
    type: POST_DATA,
    payload: value
})

export const updateUserData = (value) => ({
    type: USER_DATA,
    payload: value
})

export const updateIsLoading = (value) => ({
    type: IS_LOADING,
    payload: value
})

export const fetchData = () => async (dispatch) => {
    try {
        dispatch(updateIsLoading(true))
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        dispatch(updatePostData(response.data))
        dispatch(updateIsLoading(false))
    } catch (error) {
        console.log(error)
    }
}

export const fetchUserDetails = () => async (dispatch) => {
    try {
        dispatch(updateIsLoading(true))
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        dispatch(updateUserData(response.data))
        dispatch(updateIsLoading(false))
    } catch (error) {
        console.log(error)
    }
}


export const setSearchKey = (searchKey)=>({
    type: SEARCH_KEY,
    payload: searchKey
})


export const setSelectKey = (selectKey)=>({
    type: SELECT_KEY,
    payload: selectKey
})