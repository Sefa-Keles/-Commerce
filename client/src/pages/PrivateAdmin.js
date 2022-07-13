import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

//I wrapped it with PrivateAdmin so that a user who is a user cannot access the admin page.
//I also checked according to the admin=true prop from the Admin component in App.js
const PrivateAdmin = ({ children }) => {
    const {user} = useAuthContext();
    //console.log(children.props.admin)
    if(children.props.admin && user.role !== 'admin'){
        return <Navigate to='/'/>
    }
    return children
}

export default PrivateAdmin