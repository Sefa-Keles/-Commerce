import React from 'react'
import { Link } from "react-router-dom";
import styles from './styles.module.css'
import { Button } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <nav className= {styles.nav}>
      {/*Left of Navbar*/}
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to='/'>Ǝ-Commerc-E</Link>
        </div>
        <div className={styles.menu}>
          <li>
            <Link to='/'>Products</Link>
          </li>
        </div>
      </div> 
      {/*Right of Navbar*/}
      <div className={styles.right}>
        <div className="login">
          <Link to='/signin'>
            <Button colorScheme='pink'>Login</Button>
          </Link>
        </div>
        <div className="register">
        <Link to='/signup'>
          <Button colorScheme='pink'>Register</Button>
        </Link>  
        </div>
      </div>
    </nav>
  )
}

export default Navbar