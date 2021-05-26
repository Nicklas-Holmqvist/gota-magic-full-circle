import React from 'react'
import { useOrderContext, Order } from "../../Context/OrderContext";
import OrderList from './OrdeList'

function Admin() {

    const importOrders = useOrderContext()

    const allOrders:Order[] = importOrders.allOrders

    const viewAllOrders = allOrders.map((order) => (
        <div key={order._id}>
            <p>{order.orderNumber}</p>
            {/* <OrderList
                orderNumber={order.orderNumber}
            /> */}
        </div>
    ))

    return(
        <>
        <button style={{marginTop: "5rem"}} onClick={importOrders.fetchOrders}>Hämta order</button>
        {viewAllOrders}
        </>
    )
}

export default Admin;