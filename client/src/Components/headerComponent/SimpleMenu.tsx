import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { useProductContext } from "../../Context/ProductContext";
import "./Header.css";
import MenuIcon from '@material-ui/icons/Menu';
interface Category {
  _id: string,
  catName: string
}


export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const productContext = useProductContext()
  const getCat = productContext.getCategory
  const categories: Category[] = productContext.categories
  const resetAllCategories = productContext.setAllProducts

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    resetAllCategories()
    setAnchorE2(event.currentTarget);
  };


  const handleClose2 = () => {
    setAnchorE2(null);
  };

  const categoriesList = categories.map((c)=> (

    <Link className="link-style" to="/ProductList" key={c._id}>
          <MenuItem onClick={() => {
            getCat(c._id)}}>{c.catName}</MenuItem>
    </Link>
  ))

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
        <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleCategory}
        >
        Produkter
        </Button>
        <Menu
        id="simple-menu"
        anchorEl={anchorE2}
        keepMounted
        open={Boolean(anchorE2)}
        onClose={handleClose2}
        >
        <Link className="link-style" to="/ProductList">
          <MenuItem onClick={resetAllCategories}>Alla Produkter</MenuItem>
        </Link>
        {categoriesList}
      </Menu>
      
     
        <Link className="link-style" to="/AboutUs">
          <MenuItem onClick={handleClose}>Om oss</MenuItem>
        </Link>
        <Link className="link-style" to="/Contact">
          <MenuItem onClick={handleClose}>Kontakt</MenuItem>
        </Link>
        <Link className="link-style" to="/Tournaments">
          <MenuItem onClick={handleClose}>Turneringar</MenuItem>
        </Link>
        <Link className="link-style" to="/Login">
          <MenuItem onClick={handleClose}>Logga In</MenuItem>
        </Link>
        <Link className="link-style" to="/Register">
          <MenuItem onClick={handleClose}>Skapa konto</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
