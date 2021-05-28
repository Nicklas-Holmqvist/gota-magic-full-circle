import { Grid } from '@material-ui/core'
import { useState } from 'react'
import { Order, useOrderContext } from '../../Context/OrderContext'
import OrderList from './OrdeList'

function Orders() {

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

  return (
    <div className="orders">
      <div className="product-divider"></div>
      <p className="subtext">Vi rekommenderar att ni visar och hanterar denna vyn på en datorskärm</p>
      <button style={{marginTop: "3rem"}} onClick={importOrders.fetchOrders} className="get-orders-btn">Hämta ordrar</button>
        <Grid container spacing={0}
            direction="column"
            alignItems="center"
            justify="center" 
            md={12}>
            <Grid container alignContent='center'>
              <Grid item xs={1}>Ordernr</Grid>
              <Grid item xs={4}>Namn</Grid>  
              <Grid item xs={2}>Fraktsätt</Grid>  
              <Grid item xs={2}>Totalt värde</Grid>  
              <Grid item xs={2}>Skickat</Grid>  
            </Grid>
            <Grid container direction='column'>
            {viewAllOrders}
            </Grid>
        </Grid>  
    </div>
  )
}

export default Orders
