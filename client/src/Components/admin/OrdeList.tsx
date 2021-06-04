import {
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@material-ui/core";
  import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

  interface Order{
    orderNumber: number
    user: string
    totalCost: number
    shipping: string
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
    
    const mobileOrderRows = products.map((p) => (
      <div className="order-product-row">
        <p><b>{p.productName}</b> × {p.quantity}</p>
        <p><small>à</small> {p.price + ' kr'}</p>
      </div>
    ))

  
    return (
      <>
        <Grid className="desktop-orders">  
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">  
                <Grid item xs={1}>{props.orderNumber}</Grid>  
                <Grid item xs={4}>{props.user}</Grid>  
                <Grid item xs={2}>{props.shipping}</Grid>  
                <Grid item xs={2}>{props.totalCost}</Grid>  
                <Grid item xs={2}>{props.sent === true ? 'Skickat' : 'Ej skickat'}</Grid>  
              </AccordionSummary>
              <Grid container> 
                <Grid item xs={5} className="padding-left">Produkt</Grid>
                <Grid item xs={2}>Antal</Grid>
                <Grid item xs={3}>Pris</Grid>
              </Grid>
              {orderRows}
            </Accordion>
          </Grid> 
        </Grid>

        <div className="order">
          <div className="order-row">
            <p className="order-number">Ordernummer</p>
            <p className="order-number">#{props.orderNumber}</p>
          </div>
          <div className="order-row">
            <p>Kund</p>
            <p>{props.user}</p>
          </div>
          <div className="order-row">
            <p>Frakt</p>
            <p>{props.shipping}</p>
          </div>
          <div className="order-row">
            <p>Kostnad</p>
            <p>{props.totalCost + ' kr'}</p>
          </div>
          <div className="order-row">
            <p>Skickad</p>
            <p>{props.sent === true ? 'Skickat' : 'Ej skickat'}</p>
          </div>
          <div className="order-divider"></div>
          <div className="order-products">
            <p className="product-title">Produkt(er):</p>
            {mobileOrderRows}
          </div>
        </div>
      </>
    );

  }
  
  export default OrderList;
  