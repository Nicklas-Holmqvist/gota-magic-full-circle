import React, { useState, createContext, FunctionComponent, useContext } from 'react'

import { Product } from '../DB/Products'
export const ProductContext = createContext<Context>(undefined!);

// Typing for items in ProductProvider
type Context = {
    products: Product[],
    getProductView: Product[],
    categories: [],
    addProduct: (product: Product) => void;
    getIdFromProductList: (id:number) => void;
    ProductArray:(product: Product[]) => void
}

export const ProductProvider: FunctionComponent = ({ children }) => {

    const [products, setProducts] = useState<Product[]>([])

    const [categories, setCategories] = useState<[]>([])

    const [productId, setProductId] = useState<number>(0)

    // Add product to products
    const addProduct = (product: Product) => {}

    // Get ID from productList when pressing "LÄS MER"
    // Then filter products to set that to a new useState
    // This state is used by Context on productPage
    const getIdFromProductList = (id:number) => {
        // useProductContext(id)
        setProductId(id) 
        // setViewProduct(getProductView)        
    }

    const ProductArray = (products:Product[]) => {
        setProducts(products)
    }

    const getProductView = products.filter((p) => {
        if(p._id === productId) {
           return productId
        }
        return null
    })

    const options = {
        method: "get",
    };

    const fetchCategories = async () => {
        await fetch("/api/categories", options)
        .then(function (res) {
            if (res.status === 400) {
            return;
            }
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            setCategories(data);
        })
        .catch(function (err) {
            console.error(err);
        });
    };

    // fetchCategories()

    return (
        <ProductContext.Provider value={{ products, categories, getProductView, addProduct, getIdFromProductList, ProductArray }}>
            {children}
        </ProductContext.Provider>
    )    
};

// Custom Hooks

// Using all in ProductContext
export const useProductContext = () => useContext<Context>(ProductContext)
// Using only the products array
export const useProducts = () => {
    const value = useProductContext();
    return value.products;
}

