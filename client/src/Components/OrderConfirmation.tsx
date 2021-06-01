import "../css/orderConfirmation.css";
import "../main.css";
import { useCart } from "../Context/CartContext";

import { useCheckoutContext } from "../Context/CheckoutContext";
import { OrderRow, useOrderContext } from "../Context/OrderContext";
import { useEffect, useState } from "react";

function OrderConfirmation() {
  const cart = useCart();
  const checkoutData = useCheckoutContext();
  const orderContext = useOrderContext();
  const user = checkoutData.userInfo[0];
  const payment = checkoutData.payment[0];
  const shipping = checkoutData.shippingObject;
  const [orderProducts, setOrderProducts] = useState<OrderRow[]>([]);
  const [userAdress, setUserAdress] = useState<any>();
  const totalPay = cart.totalPrice + checkoutData.shippingObject[0].price;
  const dummyId = "123123123";
  const sent = false;
  const shippingDummy = "Airplane";
  const dummyPrice = "123";

  function GetOrderProducts() {
    const newOrderProducts = cart.lsCart.map((obj) => {
      return {
        productId: obj.id,
        productName: obj.itemName,
        price: dummyPrice,
        quantity: obj.quantity,
      };
    });
    setOrderProducts(newOrderProducts);
  }

  function getUserAdress() {
    const newUserAdress = [user.city, user.postnumber, user.deliveryaddress];
    setUserAdress(newUserAdress);
  }
  useEffect(() => {
    GetOrderProducts();
    getUserAdress();
    orderContext.getNewOrderInfo(
      dummyId,
      checkoutData.orderNumber,
      user.email,
      user.name,
      orderProducts,
      totalPay,
      shippingDummy,
      userAdress,
      sent
    );
  }, []);
  return (
    <div className="container flex">
      <div className="left-side">
        <div className="breadcrumbs"></div>
        <div className="headings">
          <h2>Orderbekräftelse</h2>
          <h5>Ordernummer: #{checkoutData.orderNumber}</h5>
          <h3>Detta är ett bevis på ditt köp. Spara denna orderbekräftelse!</h3>
        </div>
        <div className="user-info">
          <h5 className="order-info-text">
            Din leverans beräknas anlända till {user.deliveryaddress},{" "}
            {shipping[0].deliveryTime}
          </h5>
          <h3>Användaruppgifter</h3>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.mobile}</p>
          <p>
            {user.deliveryaddress}, {user.postnumber}, {user.city}
          </p>
          <h3>Betalning</h3>
          <p>{payment.cardType}</p>
          <h3>Frakt</h3>
          <p>
            {shipping[0].name}, {shipping[0].deliveryTime}, {shipping[0].price}{" "}
            kr
          </p>
        </div>
      </div>

      <div className="right-side">
        <div className="order-overview">
          <h2>Din beställning</h2>
          <h3 style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
            {cart.totalPrice} kr{" "}
          </h3>
          <div className="products">
            {cart.lsCart.map((item) => {
              return (
                <div className="cartItem">
                  <img src={item.img} alt={item.itemName} />
                  <div className="cartInfoText">
                    <p>
                      <strong>{item.itemName}</strong>
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
              <b>Total kostnad: </b> {totalPay} kr{" "}
            </p>
            <p>
              {" "}
              <b>Varav Moms:</b> {cart.totalPrice * 0.25} kr
            </p>
            <p>
              {" "}
              <b>Frakt: </b>
              {checkoutData.shippingObject[0].price} kr
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
