import React, {
  useState,
  createContext,
  FunctionComponent,
  useContext,
} from "react";

export const OrderContext = createContext<Context>(undefined!);

// Typing for items in ProductProvider
type Context = {
  allOrders: [];
  fetchOrders: () => void;
  getNewOrderInfo: (
    id: string,
    orderNumber: number,
    userId: string,
    user: any,
    products: any,
    totalCost: number,
    shipping: string,
    address: any,
    sent: boolean
  ) => void;
};

export interface Order {
  _id: string;
  orderNumber: number;
  userId: string;
  user: any;
  products: OrderRow[];
  totalCost: number;
  shipping: string;
  address: [];
  sent: boolean;
}

export interface OrderRow {
  productId: string;
  productName: string;
  price: string;
  quantity: number;
}

export const OrderProvider: FunctionComponent = ({ children }) => {
  const [allOrders, setAllOrders] = useState<[]>([]);
  const options = {
    method: "get",
  };

  const getNewOrderInfo = async (
    id: string,
    orderNumber: number,
    userId: string,
    user: any,
    products: any,
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
    console.log(newOrder);
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
      const response = await fetch("/api/order", options);
      console.log(response);
    } catch (error) {
      console.log(error);
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

  // const getNewOrderNumber = ()=>{
  //  const orderNumberList = allOrders.

  // }

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

// Custom Hooks

// Using all in ProductContext
export const useOrderContext = () => useContext<Context>(OrderContext);
