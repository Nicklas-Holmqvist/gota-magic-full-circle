import React, {
  useState,
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
} from "react";

export const OrderContext = createContext<Context>(undefined!);

// Typing for items in ProductProvider
type Context = {
  allOrders: [];
  fetchOrders: () => void;
  getNewOrderInfo: (order: any) => void;
};

export interface Order {
  _id: string;
  orderNumber: number;
  userId: string;
  user: string;
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
  const [newOrder, setNewOrder] = useState({});

  const options = {
    method: "get",
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
        console.log(data.allOrders);
        setAllOrders(data.allOrders);
      })
      .catch(function (err) {
        console.error(err);
      });
  };
  const getNewOrderInfo = (order: any) => {
    setNewOrder({});
    setNewOrder(order);
    console.log(newOrder);
  };
  const sendOrder = async (e: any) => {
    e.preventDefault();
    const newOrder = "";

    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    };

    try {
      const response = await fetch("/api/order", options);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider value={{ allOrders, fetchOrders, getNewOrderInfo }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom Hooks

// Using all in ProductContext
export const useOrderContext = () => useContext<Context>(OrderContext);
