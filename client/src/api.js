import  axios from 'axios';

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