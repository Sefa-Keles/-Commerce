import  axios from 'axios';

export const fetchProductList = async() => {
    //Fetch operation with Axios
    const {data} = await axios.get('http://localhost:4000/product');

    return data;
}