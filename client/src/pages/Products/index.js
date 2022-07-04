import { Grid } from '@chakra-ui/react'
import { fetchProductList } from '../../api';
import Card from '../../components/Card';

import { useQuery } from 'react-query'


const Products = () => {
    //Fetch operation from backend with React Query
    const { isLoading, error, data } = useQuery('products', fetchProductList);
 
    if (isLoading) return 'Loading...'
    
    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div>
            {/*Product listing for main page*/}
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                {data.map((item,index) => <Card key={index} item={item}/>)}
            </Grid>
        </div>
  )
}

export default Products