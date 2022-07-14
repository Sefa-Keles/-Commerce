import React from 'react'
import { postNewProduct } from '../../../api';
import { useMutation, useQueryClient } from 'react-query'
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react'
import { message } from 'antd'

import { FieldArray, Formik } from 'formik';
import newProductScheme from './validations'

const NewProduct = () => {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postNewProduct, {
    onSuccess: () => queryClient.invalidateQueries('admin:products')
  })
  
  const handleSubmit = async (values, bag) => {
    message.loading({ content: 'Loading...', key:'product_new'});
    //console.log(bag)
  
    const newValues = {
      ...values, 
      photos: JSON.stringify(values.photos)
    }
    
    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        console.log('Success!')
        message.success({
          content: 'The product successfuly added!',
          key:'product_new',
          duration: 2,
        })
        bag.resetForm()
      }
    })
  }

  return (
    <div>
      <Text fontSize='2xl'>New Product</Text>
      <Formik
        initialValues = {{
          title:'',
          description: '',
          price: '',
          photos: []
        }}
        validationSchema={newProductScheme}
        onSubmit={handleSubmit}
        >
          {
            ({handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting}) => (
              <>
                <Box>
                  <Box my='5' textAlign='left'>
                    <form onSubmit={handleSubmit}>
                      <FormControl>
                        <FormLabel>
                          Title
                        </FormLabel>
                        <Input 
                        name='title'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        disabled={isSubmitting}
                        isInvalid={touched.title && errors.title}
                        />
                        {touched.title && errors.title && (
                          <Text color='red.500'>{errors.title}</Text>
                        )}
                      </FormControl>
                      <FormControl mt='4'>
                        <FormLabel>
                          Description
                        </FormLabel>
                        <Textarea 
                        name='description'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        disabled={isSubmitting}
                        isInvalid={touched.description && errors.description}
                        />
                        {touched.description && errors.description && (
                          <Text color='red.500'>{errors.description}</Text>
                        )}
                      </FormControl>
                      <FormControl mt='4'>
                        <FormLabel>
                          Price
                        </FormLabel>
                        <Input 
                        name='price'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        disabled={isSubmitting}
                        isInvalid={touched.price && errors.price}
                        />
                        {touched.price && errors.price && (
                          <Text color='red.500'>{errors.price}</Text>
                        )}
                      </FormControl>
                      <FormControl mt='4'>
                        <FormLabel>
                          Photos
                        </FormLabel>
                        <FieldArray 
                        name='photos'
                        render={(arrayHelpers) => (                          
                          <div>
                            {values.photos && values.photos.map((photo, index) => (
                              <div key={index}>
                                <Input mb='2'
                                  name={`photos.${index}`}
                                  value={photo}
                                  disabled={isSubmitting}
                                  onChange={handleChange}
                                  width='7xl'
                                />
                                {/*Add A Photo Button*/}
                                <Button 
                                  size='sm' 
                                  ml='4' 
                                  type='button' 
                                  colorScheme='red' 
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}

                            <Button 
                              colorScheme='yellow' 
                              mt='5' 
                              onClick={()=> arrayHelpers.push('')}
                            >
                              Add A Photo
                            </Button>
                          </div>
                          )}
                        />
                      </FormControl>
                      {/*Update Button*/}
                      <Button 
                        mt='10'
                        ml='45%'
                        width='10%'
                        type='submit'
                        isLoading={isSubmitting}
                        colorScheme='green'
                      >
                       Save
                      </Button>
                    </form>
                  </Box>
                </Box>
              </>
            )
          }
      </Formik>
    </div>
  )
}

export default NewProduct