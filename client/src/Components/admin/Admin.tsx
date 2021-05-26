import React from 'react'
import { useOrderContext, Order } from "../../Context/OrderContext";
import OrderList from './OrdeList'

function Admin() {

    const importOrders = useOrderContext()

    const allOrders:Order[] = importOrders.allOrders
    console.log(allOrders)

    const viewAllOrders = allOrders.map((order) => (
        <div key={order._id}>
            <OrderList
                orderNumber={order.orderNumber}
                user={order.user} 
                totalCost={order.totalCost}
                shipping={order.shipping}
                sent={order.sent}
                products={order.products}
            />
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