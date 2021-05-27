import { Grid } from '@material-ui/core';
import React, { useState } from 'react'
import Orders from './Orders';
// import { useOrderContext, Order } from "../../Context/OrderContext";
// import OrderList from './OrdeList'
import Products from './Products'

function Admin() {
	const [displayProducts, setDisplayProducts] = useState(false)
	const [displayOrders, setDisplayOrders] = useState(true)

	return(
		<>
			<Products />
			<Orders />
		</>
	)
}

export default Admin;