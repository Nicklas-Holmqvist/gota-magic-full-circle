import { makeStyles, Grid } from "@material-ui/core";
import { useState } from "react";
import { Product } from "../../DB/Products";
 
const useStyles = makeStyles({
  width: { width: "100%" }
});

function ProductRow(props: Product) {
  const style = useStyles();
  const [stock, setStock] = useState(Number)

  const updateValue = (e: any) => {
    console.log(e.target.value)
    setStock(e.target.value)
  }

  const handleStockUpdate = (e: any) => {
    e.preventDefault()
    console.log('updating stock for', props.productname, 'to', stock)
  }

  return (
    <Grid className={style.width}>  
      <Grid item xs={12}>
        <div className="product-divider"></div>
        <h3 className="admin-product-name">{props.productname}</h3>
        <p className="admin-product-cardtext">{props.cardtext}</p>
        <b className="admin-product-price">{props.price + ' kr'}</b>
        <form className="stock-form">
          <label htmlFor="stock" className="stock-label">I lager:</label>
          <input className="admin-product-stock-input" type="text" defaultValue={props.stock} name="stock" onChange={updateValue} />
          <button type="submit" className="update-stock-btn" onClick={handleStockUpdate}>Ändra lagersaldo</button>
        </form>
      </Grid> 
    </Grid>
  );

}

export default ProductRow;
