import { useState, createContext, useContext, useEffect} from "react";

const BasketContext = createContext();

//This context holds the items that are sent to the basket
const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState([]);

    const addToBasket = (data ,findBasketItem) => {
        //Adds the most recently added product to the contents of the previous state
        if(!findBasketItem) {
            return setBasketItems((items) => [data, ...items])
        }
        //Basket button Toggle
        const filteredBasket = basketItems.filter((item) => item._id !== findBasketItem._id);
        setBasketItems(filteredBasket);
    }

    const values = {
        basketItems, 
        setBasketItems,
        addToBasket
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