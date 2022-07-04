import React from 'react'
import { Link } from "react-router-dom";
import styles from './styles.module.css'
import { Button } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <nav className= {styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to='/'>ECommerce</Link>
        </div>
        <div className={styles.menu}>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </div>
      </div>
      <div className={styles.right}>
        <div className="login">
          <Link to='/signin'>
            <Button colorScheme='green'>Login</Button>
          </Link>
        </div>
        <div className="register">
        <Link to='/signup'>
          <Button colorScheme='green'>Register</Button>
        </Link>  
        </div>
      </div>
    </nav>
  )
}

export default Navbar