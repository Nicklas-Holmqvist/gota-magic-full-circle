import TextField from "@material-ui/core/TextField";
import "../css/checkOut1UserInfo.css";
import { useCheckoutContext } from "../Context/CheckoutContext";
import "../css/checkOut1UserInfo.css";
import "../main.css";
import { useCart } from "../Context/CartContext";
import "../css/checkOut1UserInfo.css";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import CheckoutError from './CheckoutError'

// Interface to the userObject array
export interface User {
  name: string;
  email: string;
  mobile: string;
  deliveryaddress: string;
  city: string;
  postnumber: string;
  validated: boolean;
}

const useStyles = makeStyles({
  input: {
    marginBottom: "1rem",
  },
});

function CheckOut1UserInfo() {
  const cart = useCart();
  
  const [userName, setUserName] = useState<string>("");
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [userNameErrorText, setUserNameErrorText] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userMobile, setUserMobile] = useState<string>("");
  const [userDeliveryaddress, setUserDeliveryaddress] = useState<string>("");
  const [userDeliveryAdressError, setUserDeliveryAdressError ] = useState<boolean>(false);
  const [userDeliveryErrorText, setUserDeliveryErrorText] = useState<string>("");
  const [userCity, setUserCity] = useState<string>("");
  const [userCityError, setUserCityError] = useState<boolean>(false);
  const [userCityErrorText, setUserCityText] = useState<string>("");
  const [userPostNumber, setUserPostNumber] = useState<string>("");
  const [userPostNumberError, setUserPostNumberError] = useState<boolean>(false);
  const [userPostNumberTextError, setUserPostNumberErrorText] = useState<string>("");
  const [userEmailError, setUserEmailError] = useState<boolean>(false);
  const [userEmailErrorText, setUserEmailErrorText] = useState<string>("");
  const [userMobileError, setUserMobileError] = useState<boolean>(false);
  const [userMobileErrorText, setUserMobileText] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [ifValid, setIfValid] = useState<boolean>(false);

  const noCartItems = cart.cart.length


  // The user array
  const [userObject, setUserObject] = useState<User[]>([]);

  const user = useCheckoutContext();
  const style = useStyles();


  // Functions that handles the inputfields an save it to states right above
  const handleUserName = (e: any) => {
    setUserName(e.target.value);
    if (e.target.value.length < 5) {
      setUserNameError(false);
      setUserNameErrorText("För kort! Minst 5 tecken");
    } else {
      setUserNameError(true);
      setUserNameErrorText("");
    }
  };

  const handleuserPostNumber = (e: any) => {
    setUserPostNumber(e.target.value);
    if (!/^(\d{5})$/.test(e.target.value)) {
      setUserPostNumberError(false);
      setUserPostNumberErrorText("Skriv ditt 5 siffriga postnummer");
    } else {
      setUserPostNumberError(true);
      setUserPostNumberErrorText("");
      setUserToObject();      
    }
  };

  const handleuserEmail = (e: any) => {
    setUserEmail(e.target.value);
    if (e.target.value.indexOf("@") === -1) {
      setUserEmailError(false);
      setUserEmailErrorText("Kräver en riktig e-post");
    } else {
      setUserEmailErrorText("");
      setUserEmailError(true);
    }
  };

  const handleuserMobile = (e: any) => {
    setUserMobile(e.target.value);
    if (!/^(\d{10})$/.test(e.target.value)) {
      setUserMobileError(false);
      setUserMobileText("Ditt 10 siffriga mobilnummer");
    } else {
      setUserMobileText("");
      setUserMobileError(true);
    }
  };

  const handleuserDeliveryaddress = (e: any) => {
    setUserDeliveryaddress(e.target.value);
    if (e.target.value.length < 2) {
      setUserDeliveryAdressError(false);
      setUserDeliveryErrorText("Minst 2 tecken");
    } else {
      setUserDeliveryAdressError(true);
      setUserDeliveryErrorText("");
    }
  };


  const handleuserCity = (e: any) => {
    setUserCity(e.target.value);
    if (e.target.value.length < 2) {
      setUserCityError(false);
      setUserCityText("Minst 2 tecken");
    } else {
      setUserCityError(true);
      setUserCityText("");
    }
  };

  // End of input handlers

  // Function that saves the inputsfields to an object
  const setUserToObject = () => {
    user.getValidation(validated);

    user.saveUserInformation(
      userName,
      userEmail,
      userMobile,
      userDeliveryaddress,
      userPostNumber,
      userCity,      
      validated
    );
    setUserObject([
      {
        name: userName,
        email: userEmail,
        mobile: userMobile,
        deliveryaddress: userDeliveryaddress,
        postnumber: userPostNumber,
        city: userCity,        
        validated: validated,
      },
    ]);
  };

  useEffect(() => {

    if(ifValid === true) {
      return
    } else if(validated === true) {
      user.saveUserInformation(
        userName,
        userEmail,
        userMobile,
        userDeliveryaddress,
        userPostNumber,
        userCity,      
        validated
      );
        setIfValid(true)
    } else if(validated === false) {
      return
    }    
    else if (userObject[0].validated === true && validated === true) {
      return
    } else {return}
  }, [ifValid, user, userCity, userDeliveryaddress, userEmail, userMobile, userName, userObject, userPostNumber, validated])

  // This useEffect fetch the localStorage after the page is updated.
  // If this is not running, the saved LS data will be deleted
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUserObject(JSON.parse(data));
    }
  }, []);

  const validateFunction = () => {
    if (
      userNameError &&
      userEmailError &&
      userMobileError &&
      userPostNumberError &&
      userDeliveryAdressError &&
      userCityError === true
    ) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  useEffect(() => {
    validateFunction();
  });

  // Runs the validatation function through the checkoutContext.
  // If true the next button will be activated
  useEffect(() => {
    user.getValidation(validated);
  });

  // This useEffect saves the userObject to LS
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userObject));
  });

  return (
    <div className="container flex">
      <div className="left-side">
        <div className="headings">
          <h2>Utcheckning</h2>
          <h3>Fyll i dina användauppgifter</h3>
        </div>
        {noCartItems === 0 ? <CheckoutError /> : null} 
        <div className="checkout-form">
          <form className="flex column" autoComplete="on">
            <TextField
              name="name"
              autoFocus
              className={style.input}
              required
              label="Namn"
              variant="standard"
              value={userName}
              onChange={handleUserName}
              error={Boolean(userNameErrorText)}
              helperText={userNameErrorText}
            />

            <TextField
              name="email"
              className={style.input}
              required
              label="Email"
              placeholder="ex. johndoe@gmail.com"
              variant="standard"
              type="email"
              value={userEmail}
              onChange={handleuserEmail}
              error={Boolean(userEmailErrorText)}
              helperText={userEmailErrorText}
            />

            <TextField
              name="mobile"
              className={style.input}
              required
              label="Mobilnummer"
              variant="standard"
              type="tel"
              value={userMobile}
              onChange={handleuserMobile}
              error={Boolean(userMobileErrorText)}
              helperText={userMobileErrorText}
            />

            <TextField
              name="shipping street-address"
              className={style.input}
              required
              label="Adress"
              placeholder="ex. Exempelgatan 5B"
              variant="standard"
              value={userDeliveryaddress}
              onChange={handleuserDeliveryaddress}
              error={Boolean(userDeliveryErrorText)}
              helperText={userDeliveryErrorText}
            />

            <TextField
              name="city"
              className={style.input}
              required
              label="Stad"
              placeholder="ex. Exempelhamn"
              variant="standard"
              value={userCity}
              onChange={handleuserCity}
              error={Boolean(userCityErrorText)}
              helperText={userCityErrorText}
            />

            <TextField
              name="postal-code"
              className={style.input}
              required
              label="Postnummer"
              placeholder="ex. 123 45"
              variant="standard"
              value={userPostNumber}
              onChange={handleuserPostNumber}
              error={Boolean(userPostNumberTextError)}
              helperText={userPostNumberTextError}
            />
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

export default CheckOut1UserInfo;
