import {
    Typography,
    makeStyles,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@material-ui/core";
  import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isNumber } from "node:util";
import { useState } from "react";
  // import "../main.css";

 
  const useStyles = makeStyles({
    font: {
      fontSize: "1rem",
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
    const [mobileView, setMobileView] = useState(false)
  
    // checks if screen width is mobile size when page loads
    window.addEventListener('load', () => {
      if (window.innerWidth < 400) {
        setMobileView(true)
      }
    })

    // checks if screen width is mobile size when page resizes
    window.addEventListener('resize', () => {  
      if (window.innerWidth < 400) {
        setMobileView(true)
      } else {
        setMobileView(false)
      }
    })


    const products:OrderRow[] = props.products

    const orderRows = products.map((p) => (
      // för varje produkt --> namn, antal och pris
      <AccordionDetails>
        <Grid item xs={5}>{p.productName}</Grid>
        <Grid item xs={2}>{p.quantity}</Grid>
        <Grid item xs={3}>{p.price}</Grid>
      </AccordionDetails> 
    ))
    
    const mobileOrderRows = products.map((p) => (
      // för varje produkt --> namn, antal och pris
      <div className="order-product-row">
        <p><b>{p.productName}</b> × {p.quantity}</p>
        <p><small>à</small> {p.price + ' kr'}</p>
      </div>
    ))

    const style = useStyles();
    
    function DesktopView() {
      return (
        <Grid className={style.width}>  
        <Grid item xs={12}>
          <Accordion>
            {/* Översta raden som syns innan utfällning */}
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">  
              <Grid item xs={1}>{props.orderNumber}</Grid>  
              <Grid item xs={4}>{props.user}</Grid>  
              <Grid item xs={2}>{props.shipping}</Grid>  
              <Grid item xs={2}>{props.totalCost}</Grid>  
              <Grid item xs={2}>{props.sent === true ? 'Skickat' : 'Ej skickat'}</Grid>  
            </AccordionSummary>
            {/* Mittersta raden som syns endast vid utfällning */}
            <Grid container> 
              <Grid item xs={5}>Produkt</Grid>
              <Grid item xs={2}>Antal</Grid>
              <Grid item xs={3}>Pris</Grid>
            </Grid>
            {orderRows} {/* Namn, pris och antal för varje produkt */}
          </Accordion>
        </Grid> 
      </Grid>
      )
    }
    
    function MobileView() {
      return (
        <div className="order">
          <div className="order-row">
            <p>Ordernummer</p>
            <p>{props.orderNumber}</p>
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
      )
    }

  
    return (
      <>
        { mobileView ? <MobileView/> : <DesktopView/> }
      </>
    );

  }
  
  export default OrderList;
  