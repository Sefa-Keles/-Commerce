import  { Box, Image, Button } from "@chakra-ui/react"
import moment from 'moment'
import { Link } from "react-router-dom"
import { useBasketContext } from '../../context/BasketContext'

const Card = ( {item} ) => {

    const {addToBasket, basketItems} = useBasketContext();
    const findBasketItem = basketItems.find((basket_item) => basket_item._id === item._id);

  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='3'>
        <Link to={`/product/${item._id}`}>
            <Image src={item.photos[0]} alt='product' loading="lazy"/>
            <Box p='6px'>
                <Box d='flex' alignItems='baseline'>
                    {moment(item.createdAt).format('DD/MM/YYYY')}
                </Box>
                <Box mt='1px' fontWeight='semibold' as='h4' lineHeight='tight'> 
                    {item.title}
                </Box>
                <Box>
                    {item.price}
                </Box>
            </Box>
        </Link>
        <Button colorScheme={findBasketItem ? 'pink' : 'green' } variant='solid' onClick={() => addToBasket(item, findBasketItem)}>
            {
                findBasketItem ? 'Remove From Basket' : 'Add To Basket'
            }
        </Button>
    </Box>
  )
}

export default Card