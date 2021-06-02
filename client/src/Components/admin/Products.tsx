import React, { useState } from "react";
import { useProductContext } from "../../Context/ProductContext";

import { Product } from "../../DB/Products";
import ProductRow from "./ProductRow";
import '../../main.css'
import './admin.css'

function Products() {

    const productContext = useProductContext()
    // Products from ProductsContext
    const products:Product[] = productContext.products;

    const viewAllProducts = products.map((p) => (
        <div className="admin-product" key={p._id}>
            <ProductRow
                _id={p._id}
                productname={p.productname}
                producttype={p.producttype}
                cardtype={p.cardtype} 
                cardtext={p.cardtext}
                expansion={p.expansion}
                cmc={p.cmc}
                price={p.price}
                stock={p.stock}
                categories={p.categories}
                image={p.image}
                color={p.color}
                view={p.view}
                rating={p.rating}
                />
        </div>
    ))

    return(
        <>
        {viewAllProducts}
        </>
    )
}

export default Products