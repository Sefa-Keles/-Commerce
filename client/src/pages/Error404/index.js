import React from 'react'
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

const Error404 = () => {
  return (
    <Box>
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>ERROR 404</AlertTitle>
            <AlertDescription>THIS PAGE WAS NOT FOUND!</AlertDescription>
        </Alert>
    </Box>
  )
}

export default Error404