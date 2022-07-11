import { Alert, Image, Button, Box, Text } from '@chakra-ui/react';
import React from 'react'
import { useBasketContext } from '../../context/BasketContext'
import { Link} from 'react-router-dom';

const Basket = () => {
    const { basketItems, removeFromBasket }  = useBasketContext();
    //Sums the price of the total items in the basket
    const total = basketItems.reduce((acc, obj) => acc + obj.price, 0)
    return (
        <Box p='5'>
            {
                basketItems.length < 1 && (<Alert status='warning'>You Do Not Have Any Product In Your Basket!</Alert>)
            }
            {
                basketItems.length > 0 && <>
                    <ul style={{listStyleType:'decimal'}}>
                        {
                            basketItems.map((item) => (
                                <li key={item._id} style={{marginBottom:15}}>
                                    <Link to={`/product/${item._id}`}>
                                        <Text fontSize='18'>{item.title} - {item.price} £</Text>
                                        <Image 
                                        htmlWidth={200} 
                                        loading='lazy'
                                        src={item.photos[0]} 
                                        alt='basket item'/>
                                    </Link>

                                    <Button mt='2' size='sm' colorScheme='pink' onClick={() => {removeFromBasket(item._id)}}>
                                        Remove From Basket
                                    </Button>
                                </li>
                            ))
                        }
                    </ul>
                    
                    <Box mt='10'>
                        <Text fontSize='22'>Total: {total} £</Text>
                    </Box>
                </>
            }

        </Box>
    )
}

export default Basket