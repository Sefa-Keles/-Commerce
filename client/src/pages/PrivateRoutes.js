import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

//Component that prevents transition from url to /profile page after logout
const PrivateRoutes = () => {
    const  {loggedIn} = useAuthContext();
    return(
        loggedIn ? <Outlet/> : <Navigate to='/'/>
    )
  };

export default PrivateRoutes