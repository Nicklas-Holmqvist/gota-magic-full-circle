import {
    // Card,
    // CardContent,
    // CardActions,
    // CardMedia,
    // Button,
    // ButtonGroup,
    Typography,
    makeStyles,
    Grid,
  } from "@material-ui/core";
  // import "../main.css";

 
  const useStyles = makeStyles({

    font: {
      // textAlign: "center",
      fontSize: "1rem",
      // padding: '5rem'
    },

  });

  interface Order{
    // _id: string
    orderNumber: number
    // userId: string
    user: string
    totalCost: number
    shipping: string
    // address: []
    sent: boolean
    products: OrderRow[]
}
export interface OrderRow {
  productId: string
  productName: string
  price: string
  quantity: number
}
  function OrderList(props: Order) {

    const products:OrderRow[] = props.products

    const orderRows = products.map((p) => (
      <Grid container direction='row' justify='center'>
        <Grid item xs={3} >{p.productName}</Grid>
        <Grid item xs={3} >{p.quantity}</Grid>
        <Grid item xs={3} >{p.price}</Grid>
      </Grid>  
    ))

    const style = useStyles();
  
    return (
      <Grid container>   
        <Grid container direction='row' justify='center'>     
          <Grid item xs={1}  >{props.orderNumber}</Grid>
          <Grid item xs={3} >{props.user}</Grid>
          <Grid item xs={2} >{props.shipping}</Grid>
          <Grid item xs={2} >{props.totalCost}</Grid>
          <Grid item xs={2} ><p>{props.sent === true ? 'Skickat' : 'Ej skickat'}</p></Grid>
        </Grid>
        <Grid container direction='row' justify='center'>
          {orderRows}
        </Grid>
      </Grid>
    );
  }
  
  export default OrderList;
  