import React from 'react'
import { useParams } from 'react-router-dom';
import { fetchProduct, updateProduct } from '../../../api';
import { useQuery } from 'react-query';
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react'
import { message } from 'antd'

import { FieldArray, Formik } from 'formik';
import validationScheme from './validations'

const ProductDetail = () => {
  const {product_id} = useParams();
  const {isLoading, isError, data, error} = useQuery(['admin:product', product_id], () => fetchProduct(product_id));
  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isError) {
    return <div>Error:{error.message}</div>
  }

  const handleSubmit = async (values, bag) => {
    message.loading({content:'Loading...', key:'product_update'})
    try {
      await updateProduct(product_id, values );

      message.success({
        content: 'The product successfuly updated!',
        key:'product_update',
        duration: 2
      })
    } catch (error) {
      message.error({
        content:'The product could not updated!'
      })
    }
  }

  //console.log(data)

  return (
    <div>
      <Text fontSize='2xl'>Edit</Text>
      <Formik
        initialValues = {{
          title:data.title,
          description: data.description,
          price: data.price,
          photos: data.photos
        }}
        validationSchema={validationScheme}
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
                       Update
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

export default ProductDetail