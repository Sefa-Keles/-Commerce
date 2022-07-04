import  { Box, Image, Button } from "@chakra-ui/react"
import moment from 'moment'
import { Link } from "react-router-dom"

const Card = ( {item} ) => {
  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='3'>
        <Link to='#/'>
            <Image src={item.photo} alt='product' loading="lazy"/>
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
        <Button colorScheme='green'>Add To Basket</Button>
    </Box>
  )
}

export default Card