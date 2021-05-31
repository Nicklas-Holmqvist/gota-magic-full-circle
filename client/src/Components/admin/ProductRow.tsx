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
import { formatDiagnostics } from "typescript";
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

    // här läggs function för att anropa updateStock

    const style = useStyles();
  
    return (
      <Grid className={style.width}>  
        <Grid item xs={12}>
          {/* <Grid item xs={1}>{props.productname}</Grid>  
          <Grid item xs={4}>{props.cardtext}</Grid>     
          <Grid item xs={2}>{props.price + ' kr'}</Grid>   
          <Grid item xs={2}>{props.stock + ' in stock'}</Grid>    */}

          <div className="product-divider"></div>
          <h3 className="admin-product-name">{props.productname}</h3>
          <p className="admin-product-cardtext">{props.cardtext}</p>
          <b className="admin-product-price">{props.price + ' kr'}</b>
          <form className="stock-form">
            <label htmlFor="stock" className="stock-label">I lager:</label>
            <input className="admin-product-stock-input" type="text" defaultValue={props.stock} name="stock" />
            <button type="submit" className="update-stock-btn">Ändra lagersaldo</button> {/* här läggs en onClick={handleStockUpdate} */}
          </form>
        </Grid> 
      </Grid>
    );

  }
  
  export default ProductRow;
  