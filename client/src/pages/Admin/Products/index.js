import React from 'react'
import  { useQuery } from  'react-query'
import { fetchProductList } from '../../../api'
const Products = () => {
  const { isLoading, isError, data, error} = useQuery('admin:products', fetchProductList)
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if(isError){
    return <div>Error: error.message</div>
  }

  console.log(data)

  return (
    <div>
    </div>
  )
}

export default Products