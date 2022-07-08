import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { Text } from '@chakra-ui/react'

const Profile = () => {
    const { user } = useAuthContext();
    return (
        <div>
            <Text fontSize='25'>PROFILE</Text>
            <code>
                {
                    JSON.stringify(user)
                }
            </code>
        </div>
  )
}

export default Profile