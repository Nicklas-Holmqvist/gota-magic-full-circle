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
  import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
  import { Product } from "../../DB/Products";
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

  function ProductRow(props: Product) {

    const style = useStyles();
  
    return (
      <Grid className={style.width}>  
        <Grid 
          item xs={12}         
        >

          <Grid item xs={1}>{props.productname}</Grid>  
          <Grid item xs={4}>{props._id}</Grid>   
      </Grid> 
      </Grid>
    );

  }
  
  export default ProductRow;
  