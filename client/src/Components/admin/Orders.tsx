import { Grid } from '@material-ui/core'
import React from 'react'
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
    <div>
      <button style={{marginTop: "5rem"}} onClick={importOrders.fetchOrders}>Hämta order</button>
        <Grid container spacing={0}
            direction="column"
            alignItems="center"
            justify="center" 
            md={8}>
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
