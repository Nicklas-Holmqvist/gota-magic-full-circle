import React, { useEffect, useState } from "react";

import "./Header.css";
import Button from "@material-ui/core/Button";
import TemporaryDrawer from "./Drawer";
import SimpleMenu from "./SimpleMenu";
import { useAuthContext } from "../../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Logo from '../../assets/images/magic-1.png'

function Header() {
  const authContext = useAuthContext();
  const authUser: boolean = authContext.auth;
  const history = useHistory();

  const [authAdmin, setAuthAdmin] = useState<boolean>(authContext.authAdmin)
  const [auth, setAuth] = useState<boolean>(authUser);
  let [isOpen, setIsOpen] = useState(false);
  console.log({HEADERADMIN: authAdmin})

  useEffect(() => {
    setAuthAdmin(authContext.authAdmin);
  }, [authContext.authAdmin]);

  useEffect(() => {
    setAuth(authContext.auth);
  }, [authContext.auth, setAuth, auth]);

  const handleClick = (e: any) => {
    e.preventDefault();
    setAuth(false);
    history.push("/");
    authContext.getAuth(false);

    fetch("/api/user/logout", { method: "POST" })
      .then((response) => {
        if (response.ok) {
          alert("You are now logged out!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function LoggedInButtons() {
    return (
      <>
        <button onClick={handleClick} className="border-btn alt-btn">
          Log Out
        </button>
      </>
    );
  }

  function NotLoggedInButtons() {
    return (
      <>
        <Link to="/login">
          <button className="log-in alt-btn">Log In</button>
        </Link>
      </>
    );
  }

  function AdminButton() {
    return (
    <Link className="link-style" to="/Admin">
      <div className="menu-button">
        <Button>admin</Button>
      </div>
    </Link>
    )
  }

  return (
    <div className="header">
      <div className="menu-burger-icon">
        <SimpleMenu></SimpleMenu>
      </div>

      <Link className="link-style" to="/">
        <div className="header-icon">
          <img src={Logo} alt="Logo" />
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
        {authAdmin === true ? <AdminButton /> : ''}
      </div>

      <div className="header-right">
        {auth === false ? <NotLoggedInButtons /> : <LoggedInButtons />}
        <div className="cartIcon" onClick={() => setIsOpen(!isOpen)}>
          <TemporaryDrawer></TemporaryDrawer>
        </div>
      </div>
    </div>
  );
}

export default Header;
