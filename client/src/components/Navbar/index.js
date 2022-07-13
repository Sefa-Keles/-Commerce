import React from 'react'
import { Link } from "react-router-dom";
import styles from './styles.module.css'
import { Button } from '@chakra-ui/react'

import { useAuthContext } from '../../context/AuthContext'
import { useBasketContext } from '../../context/BasketContext';

const Navbar = () => {
  const { loggedIn, user } = useAuthContext();
  const {basketItems} = useBasketContext()
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
        {
          !loggedIn && (
            <>
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
            </>
          )}
          {
            loggedIn && (
              <>
                {
                  basketItems.length > 0 && (
                    <Link to='/basket'>
                      <Button colorSchema='pink' variant='outline'>
                        Basket ({basketItems.length})
                      </Button>
                    </Link>
                  )
                }

                {
                //Admin button in navbar if admin is logged in 
                  user ?.role ==='admin' && (
                    <Link to='/admin'>
                      <Button colorScheme='pink' variant='ghost'>Admin</Button>
                    </Link>
                  )
                }
                <Link to='/profile'>
                  <Button >Profile</Button>
                </Link>
              </>
            )
          }
      </div>
    </nav>
  )
}

export default Navbar