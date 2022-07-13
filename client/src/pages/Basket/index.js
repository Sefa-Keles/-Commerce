import { useRef, useState } from 'react'
import { 
    Alert, 
    Image, 
    Button, 
    Box, 
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea
 } from '@chakra-ui/react';
import { useBasketContext } from '../../context/BasketContext'
import { Link } from 'react-router-dom';
import { postOrders } from '../../api';

const Basket = () => {
    const [address, setAddress] = useState('')
    const { basketItems, removeFromBasket, emptyBasket }  = useBasketContext();
    const initialRef = useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure();

    //Sums the price of the total items in the basket (REDUCE FUNCTION!)
    const total = basketItems.reduce((acc, obj) => acc + obj.price, 0)

    //Saves in the backend when the save button is clicked in the modal
    const handleSubmitForm = async () => {
        const itemsId = basketItems.map((item) => item._id);

        const input = {
            address, 
            items: JSON.stringify(itemsId)
        }
    
        await postOrders(input);
        emptyBasket();
        onClose();
    }
    return (
        <Box p='5'>
            {/*/If there is no product in the basket */}
            {
                basketItems.length < 1 && (<Alert status='warning'>You Do Not Have Any Product In Your Basket!</Alert>)
            }
            
            {/*/If there is product in the basket */}
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

                    <Button mt='2' size='sm' colorScheme='green' onClick={onOpen}>Order</Button>
                    <Modal
                        initialFocusRef={initialRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Order</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Textarea ref={initialRef} placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}/>
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={handleSubmitForm}>
                                Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            }
        </Box>
    )
}

export default Basket