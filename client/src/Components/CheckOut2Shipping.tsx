import "../css/checkOut2Shipping.css";
import "../main.css";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { useState } from "react";
import { shippingMethods } from "../DB/ShippingMethods";
import { useCheckoutContext } from "../Context/CheckoutContext";
import { useCart } from "../Context/CartContext";

function CheckOut2Shipping() {
  const checkout = useCheckoutContext();
  const cart = useCart();
  const [value, setValue] = useState<string>("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRadioChange(value);
    checkout.saveShippingMethod(value);
    checkout.getValidationShipping(true);
  };

  const setRadioChange = (v: string) => {
    setValue(v);
  };

  // Prefixes for displayed text beside the radio btn
  const shippingMethodText1 =
    shippingMethods[0].name +
    " - " +
    shippingMethods[0].price +
    " kr - Beräknat leveransdatum (" +
    shippingMethods[0].deliveryTime +
    ")";
  const shippingMethodText2 =
    shippingMethods[1].name +
    " - " +
    shippingMethods[1].price +
    " kr - Beräknat leveransdatum (" +
    shippingMethods[1].deliveryTime +
    ")";
  const shippingMethodText3 =
    shippingMethods[2].name +
    " - " +
    shippingMethods[2].price +
    " kr - Beräknat leveransdatum (" +
    shippingMethods[2].deliveryTime +
    ")";
  const shippingMethodText4 =
    shippingMethods[3].name +
    " - " +
    shippingMethods[3].price +
    " kr - Beräknat leveransdatum (" +
    shippingMethods[3].deliveryTime +
    ")";
  const shippingMethodText5 =
    shippingMethods[4].name +
    " - " +
    shippingMethods[4].price +
    " kr - Beräknat leveransdatum (" +
    shippingMethods[4].deliveryTime +
    ")";

  return (
    <div className="container flex">
      <div className="left-side">
        <div className="headings">
          <h2>Frakt</h2>
          <h3>Välj fraktsätt</h3>
        </div>
        <div className="checkout-form">
          <form className="flex column">
            <FormControl>
              <RadioGroup value={value} onChange={handleRadioChange}>
                <FormControlLabel
                  className="input-field"
                  value="1"
                  control={<Radio />}
                  label={shippingMethodText1}
                />
                <FormControlLabel
                  className="input-field"
                  value="2"
                  control={<Radio />}
                  label={shippingMethodText2}
                />
                <FormControlLabel
                  className="input-field"
                  value="3"
                  control={<Radio />}
                  label={shippingMethodText3}
                />
                <FormControlLabel
                  className="input-field"
                  value="4"
                  control={<Radio />}
                  label={shippingMethodText4}
                />
                <FormControlLabel
                  className="input-field"
                  value="5"
                  control={<Radio />}
                  label={shippingMethodText5}
                />
              </RadioGroup>
            </FormControl>
          </form>
        </div>
      </div>

      <div className="right-side">
        <div className="order-overview">
          <h2>Din beställning</h2>
          <h3 style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
            {cart.cartTotalPrice} kr{" "}
          </h3>
          <div className="products">
            {cart.cart.map((item) => {
              return (
                <div className="cartItem">
                  <img src={item.img} alt={item.productname} />
                  <div className="cartInfoText">
                    <p>
                      <strong>{item.productname}</strong>
                    </p>
                    <p>{item.price} kr</p>{" "}
                    <p>
                      <strong>Antal:</strong> {item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="priceInfo">
            <p>
              {" "}
              <b>Total kostnad: </b> {cart.cartTotalPrice} kr{" "}
            </p>
            <p>
              {" "}
              <b>Varav Moms:</b> {cart.cartTotalPrice * 0.25} kr
            </p>
            <p>
              {" "}
              <b>Frakt: </b> Ej fastställt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut2Shipping;
