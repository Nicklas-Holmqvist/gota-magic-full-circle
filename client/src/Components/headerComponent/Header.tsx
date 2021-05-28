import React, { useEffect, useState } from "react";

import "./Header.css";
import Button from "@material-ui/core/Button";
import TemporaryDrawer from "./Drawer";
import SimpleMenu from "./SimpleMenu";
import { useAuthContext } from "../../Context/AuthContext";
import { Link, useHistory } from 'react-router-dom'


function Header() {

  const authContext = useAuthContext()
  const authUser:boolean = authContext.auth
  const history = useHistory()
  // const auth = authContext.auth
  
  const [auth, setAuth] = useState<boolean>(authUser)
  let [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    console.log(auth)
    setAuth(authContext.auth)
  },[authContext.auth, setAuth, auth])

  const handleClick = (e:any) => {
    e.preventDefault()
    setAuth(false)
    history.push('/')
    authContext.getAuth(false)
    console.log('Inne i handleclick')
    
    fetch('/api/user/logout', { method: 'GET' })
      .then((response) => {
        console.log('Inne i fetch')
        if (response.ok) {        
          alert('You are now logged out!')      
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function LoggedInButtons() {
    return (
      <>
        <button onClick={handleClick} className="border-btn">Log Out</button>
      </>
    )
  }

  function NotLoggedInButtons() {
    return (
      <>
        <Link to="/login">
          <button className="log-in">Log In</button>
        </Link>       
      </>
    )
  }

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
      {auth === false ? (
        <NotLoggedInButtons />)
        : (
        <LoggedInButtons />
         )}
        <div className="cartIcon" onClick={() => setIsOpen(!isOpen)}>
          <TemporaryDrawer></TemporaryDrawer>
        </div>
      </div>

    </div>
  );
}

export default Header;
