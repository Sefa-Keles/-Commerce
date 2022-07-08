import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { Text, Button } from '@chakra-ui/react'

function Profile() {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    const handleLogout = async () => {
        logout(() => {
            navigate('/')
        })
    }
    return (
        <div>
            <Text fontSize='25'>PROFILE</Text>
            <code>
                {
                    JSON.stringify(user)
                }
            </code>
            <br /><br />
            <Button colorScheme='blue' variant='solid' onClick={handleLogout}>Logout</Button>
        </div>
  )
}

export default Profile