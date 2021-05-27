// import { Grid } from '@material-ui/core';
import { useState } from 'react'
import Orders from './Orders';
// import { useOrderContext, Order } from "../../Context/OrderContext";
// import OrderList from './OrdeList'
import Products from './Products'

function Admin() {
	const [displayProducts, setDisplayProducts] = useState(true)

	const showProducts = (e: any) => {
		setDisplayProducts(true)
	}
	
	const showOrders = (e: any) => {
		setDisplayProducts(false)
	}

	return(
		<>
			<div className="admin-buttons">
				<button className="products-admin-btn" onClick={showProducts}>Visa Produkter</button>
				<button className="orders-admin-btn" onClick={showOrders}>Visa Ordrar</button>
			</div>
			{displayProducts ? <Products /> : <Orders/>}
		</>
	)
}

export default Admin;