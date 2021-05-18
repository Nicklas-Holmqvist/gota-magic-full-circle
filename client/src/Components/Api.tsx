import React, { useEffect } from 'react'

import { Product, products as mockedProducts } from '../DB/Products'
import Layout from './Layout'

import { useProductContext } from "../Context/ProductContext";

function Api() {

    // Fetch the productContext
    const productContext = useProductContext()

    // Fetch the product DB
    const products:Product[] = mockedProducts
   
    // Sends the products to ProductContext
    useEffect(() => {
        productContext.ProductArray(products);
      }, [productContext, products]);

    // This useEffect saves the userObject to LS
    // Like ComponentDidUpdate
    useEffect(() => {    
        localStorage.setItem('products', JSON.stringify(products))
    })

    return(
        <Layout />
    )
}

export default Api