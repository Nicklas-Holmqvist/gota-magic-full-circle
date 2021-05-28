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
    Accordion,
    AccordionSummary,
    AccordionDetails,
  } from "@material-ui/core";
  import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
  // import "../main.css";

 
  const useStyles = makeStyles({

    font: {
      // textAlign: "center",
      fontSize: "1rem",
      // padding: '5rem'
    },

    width: {
      width: "100%",
    }

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
      <AccordionDetails>
          <Grid item xs={5}>{p.productName}</Grid>
          <Grid item xs={2}>{p.quantity}</Grid>
          <Grid item xs={3}>{p.price}</Grid>
      </AccordionDetails> 
    ))

    const style = useStyles();
  
    return (
      <Grid className={style.width}>  
        <Grid 
          item xs={12}         
        >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >  
          <Grid item xs={1}>{props.orderNumber}</Grid>  
          <Grid item xs={4}>{props.user}</Grid>  
          <Grid item xs={2}>{props.shipping}</Grid>  
          <Grid item xs={2}>{props.totalCost}</Grid>  
          <Grid item xs={2}>{props.sent === true ? 'Skickat' : 'Ej skickat'}</Grid>  
          
        </AccordionSummary>
        <Grid container>
          <Grid item xs={5}>Produkt</Grid>
          <Grid item xs={2}>Antal</Grid>
          <Grid item xs={3}>Pris</Grid>
        </Grid>
          {orderRows}
      </Accordion>
      </Grid> 
      </Grid>
    );

  }
  
  export default OrderList;
  