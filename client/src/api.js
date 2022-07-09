import  axios from 'axios';

axios.interceptors.request.use(function (config){
//Do something before request is sent
const {origin} = new URL(config.url);
const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
const token = localStorage.getItem('access-token')

if(allowedOrigins.includes(origin)) {
    config.headers.authorization = token
}

return config

}, function(error){
    //Do something with request error
    return Promise.reject(error);
})

//Fetch operation with Axios (//product?page=pageParam )
export const fetchProductList = async({ pageParam = 0 }) => {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`);
    return data;
}
//Fetch by product id with Axios
export const fetchProduct = async(product_id) => {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`);   
    return data;
}

//Sends data received from form inputs to the backend with POST METHOD
export const fetchRegister = async(inputsData) => {
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`, inputsData);
    return data;
}

export const fetchLogin = async(inputsData) => {
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`, inputsData);
    return data;
}

export const fetchMe = async() => {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`)
    return data;
}

export const fetchLogout = async() => {
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`, {
        refresh_token: localStorage.getItem('refresh-token')
    })
    return data;
}