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
    card: {
      maxWidth: 250,
      margin: "1rem",
    },
    cardContent: {
      padding: "1rem 2rem",
    },
    media: {
      height: 230,
    },
    font: {
      textAlign: "center",
      fontSize: "1rem",
      padding: '5rem'
    },
    centerBtnLeft: {
      fontSize: "0.8rem",
      border: '1px solid grey',
      background: '#FF7A2F',
    },
    centerBtnRight: {
      fontSize: "0.8rem",
      border: '1px solid grey',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
    },
    linkStyle: {
      textDecoration: 'none'
    }
  });

  interface Order{
    // _id: string
    orderNumber: number
    // userId: string
    // user: string
    // totalCost: number
    // shipping: string
    // address: []
    // sent: boolean
}
  function OrderList(props: Order) {

    const style = useStyles();
  
    return (
      <Grid container>
        <Grid item xs={12}>
        <Typography className={style.font}>{props.orderNumber}</Typography>

        </Grid>
      </Grid>
    );
  }
  
  export default OrderList;
  