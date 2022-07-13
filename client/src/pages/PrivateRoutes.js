import { Navigate, Outlet  } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

//Component that prevents transition from url to /profile page after logout
const PrivateRoutes = () => {
    const {loggedIn} = useAuthContext();
    //console.log("loggedIN", loggedIn)
    return (
      //If the user logs in, it gives us the outlet, if logout it sends us to the main menu.
      loggedIn ? <Outlet/> : <Navigate to='/'/>
    )
  };

export default PrivateRoutes