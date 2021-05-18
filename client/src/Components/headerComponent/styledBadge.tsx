import React from "react";
import Badge from "@material-ui/core/Badge";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from "../../Context/CartContext";

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  })
)(Badge);

export default function CustomizedBadges() {
  const usecart = useCart();
  const handleDrawer = () => {
    console.log(usecart.cart.length); //TODO: Olof ska denna bort? 
  };
  return (
    <IconButton onClick={handleDrawer} aria-label="cart">
      <StyledBadge badgeContent={usecart.cart.length} color="secondary">
        <ShoppingCartIcon
          color={usecart.cart.length >= 1 ? "primary" : "secondary"}
        />
      </StyledBadge>
    </IconButton>
  );
}
