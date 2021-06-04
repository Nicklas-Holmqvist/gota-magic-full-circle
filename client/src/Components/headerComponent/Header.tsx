import { useState } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import TemporaryDrawer from "./Drawer";
import SimpleMenu from "./SimpleMenu";
import { useAuth, useAuthContext } from "../../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Logo from '../../assets/images/magic-1.png'

function Header() {
  const authUser = useAuth();
  const authContext = useAuthContext();
  const history = useHistory();
  let [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    history.push("/");
    authContext.logOut()
  };

  function LoggedInButtons() {
    return (
      <>
        <button onClick={handleClick} className="border-btn alt-btn">
          Logga ut
        </button>
      </>
    );
  }

  function NotLoggedInButtons() {
    return (
      <>
        <Link to="/login">
          <button className="log-in alt-btn">Logga In</button>
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
        {authUser === undefined ? '' : authUser.isAdmin ? <AdminButton /> : ''}
      </div>

      <div className="header-right">
        {authContext.user === undefined ? <NotLoggedInButtons /> : <LoggedInButtons />}
        <div className="cartIcon" onClick={() => setIsOpen(!isOpen)}>
          <TemporaryDrawer></TemporaryDrawer>
        </div>
      </div>
    </div>
  );
}

export default Header;
