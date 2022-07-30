import React from 'react'
import { Flex, Box, Heading, FormControl, FormLabel, Button, Input, Alert} from '@chakra-ui/react'
import { useFormik } from 'formik'
import validationSchema from './validations'
import { fetchLogin } from '../../../api'

import { useAuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      email:'',
      password:'', 
      confirmPassword:''
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginData = await fetchLogin({ email: values.email, password: values.password});
        login(loginData)
        navigate('/profile');
      } catch (error) {
        bag.setErrors({general: error.response.data.message})
      }
    }
  })

  return (
    <div>
      <Flex align='center' width='full' justifyContent='center'>
        <Box textAlign='center'>
          <Heading>Sign In</Heading>
          <Box my={5}>
            {
              formik.errors.general && (
                <Alert status='error'>
                  {formik.errors.general}    
                </Alert>
              )
            }
          </Box>
          <Box my={5} textAlign='left'>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel>E-Mail:</FormLabel>
              <Input name='email' 
              placeholder='E-Mail' 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.email} 
              isInvalid={formik.touched.email && formik.errors.email}/>
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Password:</FormLabel>
              <Input name='password' 
              type='password' 
              placeholder='Password' 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.password} 
              isInvalid={formik.touched.password && formik.errors.password}/>
            </FormControl>

            <Button mt={4} width='full' type='submit'>
              Sign In
            </Button>
          </form>
        </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Signin