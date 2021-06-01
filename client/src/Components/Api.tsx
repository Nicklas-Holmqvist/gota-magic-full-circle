import React, { useEffect, useState } from "react";

import { Product } from "../DB/Products";
import Layout from "./Layout";

import { useProductContext } from "../Context/ProductContext";

function Api() {
  // Fetch the productContext
  const productContext = useProductContext();

  // Fetch the product DB
  // const products:Product[] = mockedProducts
  const [products, setProducts] = useState<Product[]>([]);

  // Sends the products to ProductContext
  useEffect(() => {
    productContext.ProductArray(products);
  }, [productContext, products]);

  // This useEffect saves the userObject to LS
  // Like ComponentDidUpdate
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  });

  useEffect(() => {
    const options = {
      method: "get",
    };

    fetch("/api/product", options)
      .then(function (res) {
        if (res.status === 400) {
          return;
        }
        return res.json();
      })
      .then(function (data) {
        setProducts(data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, [setProducts]);

  return <Layout />;
}

export default Api;
