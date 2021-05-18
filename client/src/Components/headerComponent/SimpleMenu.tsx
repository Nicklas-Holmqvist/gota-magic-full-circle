import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import "./Header.css";
import MenuIcon from '@material-ui/icons/Menu';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="hamb-menu-icon-btn"
      >
        <MenuIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link className="link-style" to="/ProductList">
          <MenuItem onClick={handleClose}>Produkter</MenuItem>
        </Link>
        <Link className="link-style" to="/AboutUs">
          <MenuItem onClick={handleClose}>Om oss</MenuItem>
        </Link>
        <Link className="link-style" to="/Contact">
          <MenuItem onClick={handleClose}>Kontakt</MenuItem>
        </Link>
        <Link className="link-style" to="/Tournaments">
          <MenuItem onClick={handleClose}>Turneringar</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
