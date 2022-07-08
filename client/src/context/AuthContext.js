import { useState, createContext, useEffect, useContext } from 'react';
import {Flex, Spinner} from '@chakra-ui/react'
import { fetchMe } from '../api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //Anonymous function for async fetch from api.js
       (async ()=> {
        try {
            const me =await fetchMe();
            setLoggedIn(true);
            setUser(me);
            setLoading(false);

        } catch (error) {
            setLoading(false);
        }
       })(); 

    }, [])

    const login = (data) => {
        setLoggedIn(true);
        setUser(data.user);

        localStorage.setItem('access-token', data.accessToken)
        localStorage.setItem('refresh-token', data.refreshToken)
    }

    const values = {
        loggedIn,
        user,
        login
    };

    if(loading) {
        return (
            <Flex justifyContent='center' alignItems='center' height='100vh'>
                <Spinner thickness='4px' speed='0.65s' emptyColor='grey.200' size='xl' color='red.500'/>
            </Flex>
        )
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};

const useAuthContext = () => useContext(AuthContext); 

export { AuthProvider, useAuthContext }