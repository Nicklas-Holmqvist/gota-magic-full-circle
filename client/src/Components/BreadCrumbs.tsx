import React, { useEffect, useState } from "react";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";
import Stepper from "@material-ui/core/Stepper";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

import "../main.css";
import "../css/breadcrumbs.css";

import { Link } from "react-router-dom";

import CheckOut1UserInfo from "./CheckOut1UserInfo";
import CheckOut2Shipping from "./CheckOut2Shipping";
import CheckOut3Payment from "./CheckOut3Payment";
import OrderConfirmation from "./OrderConfirmation";

import { CSSProperties } from "@material-ui/styles";
import { useCheckoutContext } from "../Context/CheckoutContext";
import { useCart } from "../Context/CartContext";
import { Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { useOrderContext } from "../Context/OrderContext";

// Creates an array for all the steps.
// the amount of strings in the array decides the amount of
// steps in the stepper
function getSteps() {
  return ["Användaruppgifter", "Frakt", "Betalning", "Orderbekräftelse"];
}

// Depending on what step is the current
// different components is returned between the
// stepper and the buttons
function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return <CheckOut1UserInfo />;
    case 1:
      return <CheckOut2Shipping />;
    case 2:
      return <CheckOut3Payment />;
    case 3:
      return <OrderConfirmation />;
    case 4:
      break;
    default:
      return "Unknown stepIndex";
  }
}

function BreadCrumbs() {
  const authContext = useAuthContext();
  const auth: boolean = authContext.auth;

  const cart = useCart();
  const user = useCheckoutContext();
  const orderUser = user.userInfo[0];
  const orderContext = useOrderContext();

  const validatedUser = user.validatedUser;
  const validatedUserShipping = user.validatedShipping;
  const validatedUserPayment = user.validatedPayment;
  const validatedUserCardPayment = user.validatedCardPayment;
  const [disableAtPay, setDisableAtPay] = useState(true);
  const shipping = user.shippingObject;

  const dummyOrder = {
    id: " 123",
    orderNumber: 123,
    userId: "1111",
    user: "olle",
    products: "any",
    totalCost: "123",
    shipping: "Boat",
    address: "Sörbyvägen",
    sent: true,
  };
  let dummyAdress = {
    adress: "Sörbyn",
    zipcode: "12312",
    city: "Rööt",
  };

  const cleanPaymentUser = () => {
    const cardName = "";
    const cardNumber = "";
    const expireDate = "";
    const lastDate = "";
    const cvc = "";
    user.saveUserPayment(cardName, cardNumber, expireDate, lastDate, cvc);
  };

  const [active, setActive] = useState(false);
  // validatedUser === false
  // If this varible is 0 in length, the orderNumber will not get a new one
  //if you do the checkout without anything in the cart
  const ifCartIsEmpty = cart.cart;

  const activateBtn = () => {
    if (validatedUser === false && activeStep === 0) {
      setActive(false);
    } else if (
      validatedUser === true &&
      activeStep === 0 &&
      ifCartIsEmpty.length === 0
    ) {
      setActive(false);
    } else if (validatedUser === true && activeStep === 0) {
      setActive(true);
      user.getValidationShipping(false);
    } else if (validatedUserShipping === false && activeStep === 1) {
      setActive(false);
    } else if (validatedUserShipping === true && activeStep === 1) {
      setActive(true);
      user.getValidationPayment(false);
    } else if (validatedUserPayment === false && activeStep === 2) {
      setActive(false);
    } else if (
      activeStep === 2 &&
      user.payment[0].cardId === 1 &&
      validatedUserCardPayment === false
    ) {
      setActive(false);
    } else if (
      activeStep === 2 &&
      user.payment[0].cardId === 1 &&
      validatedUserCardPayment === true
    ) {
      setActive(true);
      user.getValidation(false);
      user.getValidationShipping(false);
    } else if (validatedUserPayment === true && activeStep === 2) {
      setActive(true);
      user.getValidation(false);
      user.getValidationShipping(false);
    } else if (activeStep === 3) {
      setDisableAtPay(true);

      setActive(true);
      user.getValidationPayment(false);
      user.getValidationCardPayment(false);
      cleanPaymentUser();
    }
  };

  useEffect(() => {
    activateBtn();
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  // Depending on where in the stepper the user is
  // the functionality of the next button is changed here.
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 0) {
      activateBtn();
    } else if (activeStep === 1) {
    } else if (activeStep === 2) {
      if (ifCartIsEmpty.length !== 0) {
        user.addOrderNumber();
      }
      cart.ResetCart();
    } else if (activeStep === 3) {
    } else if (activeStep >= 3) {
      return;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const paymentDelay = () => {
    setActive(false);
    if (activeStep === 2 && disableAtPay === false) {
      return;
    }
    setTimeout(() => {
      handleNext();
    }, 3500);
  };

  const handleClick = () => {
    activateBtn();

    if (activeStep === 2) {
      setDisableAtPay(false);
      setActive(false);
      paymentDelay();
      orderContext.getNewOrderInfo(
        dummyOrder.id,
        user.orderNumber,
        authContext.user._id,
        orderUser.name,
        cart.cart,
        cart.cartTotalPrice + user.shippingObject[0].price,
        shipping[0].name,

        {
          street: orderUser.deliveryaddress,
          zipCode: orderUser.postnumber,
          city: orderUser.city,
        },

        dummyOrder.sent
      );
      console.log(cart.cartTotalPrice);
      console.log(user.userInfo[0]);
      console.log(authContext.user._id);
    } else {
      handleNext();
    }
  };
  if (!auth) {
    return <Redirect to="/Login" />;
  }

  return (
    <div className="background">
      <div className="grey-card main-box">
        <div className="crumbs-container">
          <Grid item xs={12} sm={12} style={stepGrid}>
            <Hidden xsDown>
              <Stepper
                style={stepperStyle}
                activeStep={activeStep}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Hidden>
            <Hidden smUp>
              <Stepper
                style={stepperStyle}
                activeStep={activeStep}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel></StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Hidden>
          </Grid>
          <div className="bread-btn">
            {activeStep === steps.length ? (
              <div>
                <div className="slutfort-kop" style={textStyle}>
                  <p>Tack för din beställning, mycket nöje!</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "2rem",
                  }}
                >
                  <Link className="link-style" to="/ProductList">
                    <Button
                      onClick={cart.resetCartLs}
                      variant="contained"
                      color="primary"
                    >
                      Fortsätt Handla
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <p>{getStepContent(activeStep)}</p>

                <div className="bread-btn">
                  <Button
                    disabled={activeStep === 0 || activeStep === 3}
                    onClick={handleBack}
                  >
                    Tillbaka
                  </Button>
                  {/* {disableAtPay === true ?} */}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={active === false || disableAtPay === false}
                    onClick={handleClick}
                  >
                    {activeStep === steps.length - 1
                      ? "Klar"
                      : activeStep === steps.length - 2 &&
                        disableAtPay === false
                      ? "Bearbetar..."
                      : activeStep === steps.length - 2
                      ? "Slutför köp"
                      : "Nästa"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const stepperStyle: CSSProperties = {
  backgroundColor: "#ededed",
  padding: "0 0 1.5rem 0",
  display: "flex",
};

const stepGrid: CSSProperties = {
  width: "100%",
};

const textStyle: CSSProperties = {
  textAlign: "center",
};

export default BreadCrumbs;
