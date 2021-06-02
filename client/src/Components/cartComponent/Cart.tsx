import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import "./cartContainer.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { useCart } from "../../Context/CartContext";
import { orderItem } from "../../Types/orderItem";
interface Props {
  item: orderItem;
}

const CartComponent = ({ item }: Props) => {
  const cart = useCart();

  const priceText = item.price + " kr";
  const totalPriceText = "Totalpris: " + item.price * item.quantity + " kr";

  return (
    <div className="itemContainer">
      <div className="product">
        <div className="productImageContainer">
          <img className="img" src={item.img} alt="" />
        </div>
        <div className="productInfoText">
          <p>
            <strong>{item.productname}</strong>
          </p>
          <p>{priceText}</p>
          <div className="buttonContainer">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button
                onClick={() =>
                  cart.addToCart(item.productname, item.price, item.img, item.id)
                }
              >
                +
              </Button>
              <div className="numberContainer">
                <p>{item.quantity}</p>
              </div>
              <Button onClick={() => cart.decreaseQuantity(item)}>-</Button>
            </ButtonGroup>
          </div>
          <p>{totalPriceText}</p>
        </div>
      </div>
      <div className="iconContainer">
        <DeleteIcon onClick={() => cart.removeFromCart(item.productname)} />
      </div>
    </div>
  );
};

export default CartComponent;
