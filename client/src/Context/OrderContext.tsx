import React, { useState, createContext, FunctionComponent, useContext, useEffect } from 'react'

export const OrderContext = createContext<Context>(undefined!);

// Typing for items in ProductProvider
type Context = {
    allOrders: [],
    fetchOrders:() => void
}

export interface Order{
    _id: string
    orderNumber: number
    userId: string
    user: string
    totalCost: number
    shipping: string
    address: []
    sent: boolean
}

export const OrderProvider: FunctionComponent = ({ children }) => {

    const [allOrders, setAllOrders] = useState<[]>([])

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
            console.log(data.allOrders)
            setAllOrders(data.allOrders);
        })
        .catch(function (err) {
            console.error(err);
        });
    };

    return (
        <OrderContext.Provider value={{ allOrders, fetchOrders }}>
            {children}
        </OrderContext.Provider>
    )    
};

// Custom Hooks

// Using all in ProductContext
export const useOrderContext = () => useContext<Context>(OrderContext)


