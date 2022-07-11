import { useState, createContext, useContext, useEffect} from "react";

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem('basket')) || [];

//This context holds the items that are sent to the basket
const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState(defaultBasket);

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basketItems))
    },[basketItems])

    const addToBasket = (data ,findBasketItem) => {
        //Adds the most recently added product to the contents of the previous state
        if(!findBasketItem) {
            return setBasketItems((items) => [data, ...items])
        }
        //Basket button Toggle
        const filteredBasket = basketItems.filter((item) => item._id !== findBasketItem._id);
        setBasketItems(filteredBasket);
    }

    const removeFromBasket = (item_id) => {
        const filtered = basketItems.filter((item) => item._id !==item_id);
        setBasketItems(filtered)
    }

    const values = {
        basketItems, 
        setBasketItems,
        addToBasket,
        removeFromBasket
    }

    return (
        <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
    );
};

const useBasketContext = () => useContext(BasketContext);

export {
    BasketProvider,
    useBasketContext
}