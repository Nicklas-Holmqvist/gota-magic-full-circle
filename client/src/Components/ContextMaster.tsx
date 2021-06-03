import React from "react";
import { CartContextProvider } from "../Context/CartContext";
import { CheckoutProvider } from "../Context/CheckoutContext";
import { ProductProvider } from "../Context/ProductContext";
import { OrderProvider } from "../Context/OrderContext";
import { AuthProvider } from "../Context/AuthContext";
import { ShippingProvider } from "../Context/ShippingContext";
import Api from "./Api";

function ContextMaster() {
  return (
    <>
      <ShippingProvider>
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
      </ShippingProvider>
    </>
  );
}

export default ContextMaster;
