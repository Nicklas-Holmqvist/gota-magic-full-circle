import React from "react";
import { CartContextProvider } from "../Context/CartContext";
import { CheckoutProvider } from "../Context/CheckoutContext";
import { ProductProvider } from "../Context/ProductContext";
import { OrderProvider } from "../Context/OrderContext";
import { AuthProvider } from "../Context/AuthContext";
import Api from "./Api";

function ContextMaster() {
  return (
    <>
      <AuthProvider>
        <OrderProvider>
          <ProductProvider>
            <CheckoutProvider>
              <CartContextProvider>
                <Api />
              </CartContextProvider>
            </CheckoutProvider>
          </ProductProvider>
        </OrderProvider>
      </AuthProvider>
    </>
  );
}

export default ContextMaster;
