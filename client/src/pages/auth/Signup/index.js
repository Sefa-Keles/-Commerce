import React from 'react'
import { Flex, Box, Heading, FormControl, FormLabel, Button, Input, Alert} from '@chakra-ui/react'
import { useFormik } from 'formik'
import validationSchema from './validations'
import { fetchRegister } from '../../../api'

import { useAuthContext } from '../../../context/AuthContext'

const Signup = () => {
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
        const registeredData = await fetchRegister({ email: values.email, password: values.password});
        login(registeredData)
      } catch (error) {
        bag.setErrors({general: error.response.data.message})
      }
    }
  })

  return (
    <div>
      <Flex align='center' width='full' justifyContent='center'>
        <Box textAlign='center'>
          <Heading>Sign Up</Heading>
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

            <FormControl mt={4}>
            <FormLabel>Confirm Password:</FormLabel>
              <Input name='confirmPassword' 
              type='password' 
              placeholder='Confirm Your Password' 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.confirmPassword} 
              isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}/>
            </FormControl>

            <Button mt={4} width='full' type='submit'>
              Sign Up
            </Button>
          </form>
        </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Signup