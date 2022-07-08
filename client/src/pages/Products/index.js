import React from 'react'
import { Grid, Box, Flex, Button } from '@chakra-ui/react'
import { fetchProductList } from '../../api';
import Card from '../../components/Card';

import { useInfiniteQuery } from 'react-query'


const Products = () => {
    //Fetch operation from backend with React Query
    const { 
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
     } = useInfiniteQuery('products', fetchProductList,
        {
            //It decides to switch to the other page according to the number of products that should be on 1 page in the backend.
            getNextPageParam: (lastPage, pages) => {
                const nextExistingProducts = lastPage?.length === 12

                if(!nextExistingProducts) {
                    return;
                }
                
                return pages.length + 1;
            }
        } );
        
    if (status === "loading") return 'Loading...'
    
    if (status === 'error') return 'An error has occurred: ' + error.message;

    console.log("data" , data)

    return (
        <div>
            {/*Product listing for main page with pagination*/}
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                {
                    data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {
                                group.map((item) => (
                                    <Box w='100%' key={item._id}>
                                        <Card item={item}/>
                                    </Box>   
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </Grid>
            <Flex mt='10' justifyContent='center'>
                <Button
                isLoading={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                >
                {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load More'
                    : 'Nothing more to load'}
                </Button>
            </Flex>
            {/* <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div> */}
        </div>
  )
}

export default Products