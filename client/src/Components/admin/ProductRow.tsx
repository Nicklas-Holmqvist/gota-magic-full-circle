import { makeStyles, Grid } from "@material-ui/core";
import { useState } from "react";
import { Product } from "../../DB/Products";
 
const useStyles = makeStyles({
  width: { width: "100%" }
});

function ProductRow(props: Product) {
  const style = useStyles();
  const [stock, setStock] = useState(Number)
  const [updateMsg, setUpdateMsg] = useState('')

  const updateValue = (e: any) => {
    setStock(e.target.value)
  }

  const handleStockUpdate = async (e: any) => {
    e.preventDefault()

    const stockObject = { stock }

    const options = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stockObject)
    }

    try {
      setUpdateMsg('Lagersaldo uppdaterat')

      setTimeout(async () => {
        await fetch(`/api/product/${props._id}`, options)
        setUpdateMsg('')
      }, 1500);
    } catch (err) {
      console.error(err)
    }
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
          <span className="update-successful">{updateMsg}</span>
        </form>
      </Grid> 
    </Grid>
  );
}

export default ProductRow;
