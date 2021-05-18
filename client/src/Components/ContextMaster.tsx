import React from "react";
import { CartContextProvider } from "../Context/CartContext";
import { CheckoutProvider } from "../Context/CheckoutContext";
import { ProductProvider } from "../Context/ProductContext";
import Api from "./Api";

function ContextMaster() {
  return (
    <>
      <ProductProvider>
        <CheckoutProvider>
          <CartContextProvider>
            <Api />
          </CartContextProvider>
        </CheckoutProvider>
      </ProductProvider>
    </>
  );
}

export default ContextMaster;
