import React from 'react'
import './styles.css'
import { Box } from '@chakra-ui/react';
import { Link, Routes, Route } from 'react-router-dom';
import AdminHome from './Home/AdminHome';
import Orders from './Orders/index';
import Products from './Products';

const Admin = () => {
  return (
    <div>
        <nav>
            <ul className='admin-menu'>
                <li>
                    <Link to=''>Admin Home</Link>
                </li>
                <li>
                    <Link to={'orders'}>Orders</Link>
                </li>
                <li>
                    <Link to={'products'}>Products</Link>
                </li>
            </ul>
        </nav>
        <Box mt='10'>
          <Routes>
            <Route element={<AdminHome/>}/>
            <Route path={'orders'} element={<Orders/>}/>
            <Route path={'products'} element={<Products/>}/>
          </Routes>      
        </Box>
    </div>
  )
}

export default Admin