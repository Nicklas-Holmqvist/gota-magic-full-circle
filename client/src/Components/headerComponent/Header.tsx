import React, { useState } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import TemporaryDrawer from "./Drawer";
import SimpleMenu from "./SimpleMenu";
import { Link
 } from 'react-router-dom';


function Header() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">

      <div className="menu-burger-icon">
        <SimpleMenu></SimpleMenu>
      </div>

      <Link className="link-style" to="/">
        <div className="header-icon">
          <img
            src="../magic 1.png"
            alt=""
            />
          <h3>Göta Magic</h3>
        </div>
      </Link>

      <div className="menu-bar">
        <Link className="link-style" to="/ProductList">
          <div className="menu-button">
            <Button>Produkter</Button>
          </div>
        </Link>
        <Link className="link-style" to="/AboutUs">
          <div className="menu-button">
            <Button>Om oss</Button>
          </div>
        </Link>
        <Link className="link-style" to="/Contact">
          <div className="menu-button">
            <Button>Kontakt</Button>
          </div>
        </Link>
        <Link className="link-style" to="/Tournaments">
          <div className="menu-button">
            <Button>Turneringar</Button>
          </div>
        </Link>
      </div>

      <div className="header-right">
        <Link className="link-style" to="/Login">
          <div className="menu-button menu-button-last">
            <Button>Logga In</Button>
          </div>
        </Link>
        <div className="cartIcon" onClick={() => setIsOpen(!isOpen)}>
          <TemporaryDrawer></TemporaryDrawer>
        </div>
      </div>

    </div>
  );
}

export default Header;
