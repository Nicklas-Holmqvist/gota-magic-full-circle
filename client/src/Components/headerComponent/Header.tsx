import React, { useEffect, useState } from "react";

import "./Header.css";
import Button from "@material-ui/core/Button";
import TemporaryDrawer from "./Drawer";
import SimpleMenu from "./SimpleMenu";
import { useAuthContext } from "../../Context/AuthContext";
import { Link, useHistory } from 'react-router-dom'
import { useProductContext } from "../../Context/ProductContext";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
interface Category {
  _id: string,
  catName: string
}

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const authContext = useAuthContext()
  const authUser:boolean = authContext.auth
  const productContext = useProductContext()
  const getCat = productContext.getCategory
  const categories: Category[] = productContext.categories
  const resetAllCategories = productContext.setAllProducts
  const history = useHistory()
  
  const [auth, setAuth] = useState<boolean>(authUser)
  let [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    setAuth(authContext.auth)
  },[authContext.auth, setAuth, auth])

  const handleClick = (e:any) => {
    e.preventDefault()
    setAuth(false)
    history.push('/')
    authContext.getAuth(false)
    
    fetch('/api/user/logout', { method: 'POST' })
      .then((response) => {
        if (response.ok) {        
          alert('You are now logged out!')      
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const categoriesList = categories.map((c)=> (

    <Link className="link-style" to="/ProductList" key={c._id}>
          <MenuItem onClick={() => {
            getCat(c._id)}}>{c.catName}</MenuItem>
    </Link>
  ))

  const handleCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    resetAllCategories()
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleCategory}        
        className="hamb-menu-icon-btn"
      >
        Produkter
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link className="link-style" to="/ProductList">
          <MenuItem onClick={resetAllCategories}>Alla Produkter</MenuItem>
        </Link>
        {categoriesList}
      </Menu>
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
