import { Button } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import CartComponent from "./Cart";
import "./productCart.css";

const ProductCart = () => {
  const cart = useCart();

  // byt ut texterna där pris ska visas

  if (cart.cart.length > 0) {
    return (
      <div className="background" style={backStyle}>
        <div className="grey-card">
          <h2>Din varukorg</h2>
          <span>{cart.cartTotalPrice} kr</span>
          <div className="cartInfoContainer">
            <div className="productsInCart">
              {cart.cart.map((item) => {
                return <CartComponent key={item.id} item={item} />;
              })}
            </div>
            <div className="priceInfo">
              <p>
                {" "}
                <b>Total kostnad: </b> {cart.cartTotalPrice} kr
              </p>
              <p>
                {" "}
                <b>Varav Moms:</b> {cart.totalPrice * 0.25} kr
              </p>
              <p>
                {" "}
                <b>Frakt: </b> Ej fastställt
              </p>

              <Link className="till-kassan-btn" to="/BreadCrumbs">
                <Button variant="contained" color="primary">
                  Till Kassan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "30rem",
        }}
      >
        <h3>Din varukorg är tom!</h3>
      </div>
    );
};

const backStyle: CSSProperties = {
  minHeight: '69vh'
}

export default ProductCart;
