import React from 'react'
import { Box, Text, Button} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchProduct } from '../../api'
import moment from 'moment';
import ImageGallery from 'react-image-gallery'

const ProductDetail = () => {
    const {product_id} = useParams();
    const {isLoading, error, data} = useQuery(['product',product_id], () => fetchProduct(product_id))

    if(isLoading) return 'Loading...'
    if(error) return 'An error has occurred: ' + error.message;

    const images = data.photos.map((url) => ({ original: url }))

    return (
        <Box>
            <Button colorScheme='green'>Add To Basket</Button>
            <Text as='h2' fontSize='2xl'>{data.title}</Text>
            <Text as='h2' fontSize='2xl'>{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
            <p>{data.description}</p>
            <Box margin='10'>
                <ImageGallery items={images}/>
            </Box>
        </Box>
  )
}

export default ProductDetail