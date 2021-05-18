import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import CustomizedBadges from "./styledBadge";
import CartComponent from "../cartComponent/Cart";
import { useCart } from "../../Context/CartContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  marginBottom: {
    marginBottom: '1rem',
  },
});

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const cart = useCart();
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></div>
  );

  return (
    <div>
      {(["right"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}>
            <CustomizedBadges></CustomizedBadges>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            <div
              style={{
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "1rem",
              }}
            >
              <h3>Dina produkter: {cart.cartTotalPrice} kr </h3>
              {cart.cart.map((item) => {
                return <CartComponent key={item.id} item={item} />;
              })}
              <Link className="cart-btn-style" to="/ProductCart">
                <Button
                  onClick={toggleDrawer(anchor, false)}
                  variant="contained"
                  color="primary"
                  disabled={cart.cart.length >= 1 ? false : true}
                  className={classes.marginBottom}
                >
                  Till kassa
                </Button>
              </Link>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
