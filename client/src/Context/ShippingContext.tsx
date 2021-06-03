import React, {
  useState,
  createContext,
  FunctionComponent,
  useContext,
} from "react";
import { useEffect } from "react";

export const ShippingContext = createContext<Context>(undefined!);

export interface Shipping{
  deliveryTime: string
  name: string
  price: number
  _id: string
}
// Typing for items in ProductProvider
type Context = {
  shipping:Shipping[]
};

export const ShippingProvider: FunctionComponent = ({ children }) => {
  const [shipping, setShipping] = useState<Shipping[]>([]);

  useEffect(() => {

    const options = {
      method: "get",
    };

    const fetchShippingMethods = async () => {
      await fetch("/api/shipping", options)
        .then(function (res) {
          if (res.status === 400) {
            return;
          }
          return res.json();
        })
        .then(function (data) {
          setShipping(data);
        })
        .catch(function (err) {
          console.error(err);
        });
    };
  
    fetchShippingMethods()
  },[setShipping])

  
  return (
    <ShippingContext.Provider
      value={{ shipping }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

// Custom Hooks

// Using all in ProductContext
export const useShippingContext = () => useContext<Context>(ShippingContext);

export const useShipping = () => {
  const shipping = useShippingContext()
  return shipping.shipping
}
