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
}
  function OrderList(props: Order) {

    const style = useStyles();
  
    return (
      <Grid container direction='row' justify='center'>        
          <Grid item xs={1}>{props.orderNumber}</Grid>
          <Grid item xs={3}>{props.user}</Grid>
          <Grid item xs={2}>{props.shipping}</Grid>
          <Grid item xs={2}>{props.totalCost}</Grid>
          <Grid item xs={2}><p>{props.sent === true ? 'Skickat' : 'Ej skickat'}</p></Grid>
      </Grid>
    );
  }
  
  export default OrderList;
  