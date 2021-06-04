import React, {
  useState,
  createContext,
  FunctionComponent,
  useContext,
} from "react";
import { orderItem } from "../Types/orderItem";

export const OrderContext = createContext<Context>(undefined!);

// Typing for items in ProductProvider
type Context = {
  allOrders: [];
  fetchOrders: () => void;
  getNewOrderInfo: (
    id: string,
    orderNumber: number,
    userId: string,
    user: string,
    products: orderItem[],
    totalCost: number,
    shipping: string,
    address: any,
    sent: boolean
  ) => void;
};

export const OrderProvider: FunctionComponent = ({ children }) => {
  const [allOrders, setAllOrders] = useState<[]>([]);
  const options = {
    method: "get",
  };

  const getNewOrderInfo = async (
    id: string,
    orderNumber: number,
    userId: string,
    user: string,
    products: orderItem[],
    totalCost: number,
    shipping: string,
    adress: {
      street: string;
      zipCode: string;
      city: string;
    },
    sent: boolean
  ) => {
    const newOrder = {
      _id: id,
      orderNumber,
      userId,
      user,
      products,
      totalCost,
      shipping,
      adress,
      sent,
    };
    sendOrder(newOrder);
  };

  const sendOrder = async (order: any) => {
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    try {
      await fetch("/api/order", options);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    await fetch("/api/order", options)
      .then(function (res) {
        if (res.status === 400) {
          return;
        }
        return res.json();
      })
      .then(function (data) {
        setAllOrders(data.allOrders);
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  return (
    <OrderContext.Provider
      value={{
        allOrders,
        fetchOrders,
        getNewOrderInfo,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext<Context>(OrderContext);
