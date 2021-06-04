import { CSSProperties } from "@material-ui/styles";
import '../css/components.css';
import ProductListCard from "./ProductListCard";
import React, { useEffect, useState } from "react";
import { IconButton, Grid} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useProductContext } from "../Context/ProductContext";
import { Product } from "../DB/Products";

interface Category {
  _id: string,
  catName: string
}

function ProductList() {

  const productContext = useProductContext()

  // Products from ProductsContext
  const products = productContext.filterProduct;

  // Number of items in productlist
  const pageNumbers = 12;

  const [page, setPage] = useState(0);
  const [pageItems, setPageItems] = useState(pageNumbers);
  const [pageNumber, setPageNumber] = useState(1);
  const [productViewArray, setProductViewArray] = useState<Product[]>(products);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const getCat = productContext.getCategory
  const categories: Category[] = productContext.categories
  const resetAllCategories = productContext.setAllProducts

  useEffect(() => {
    setProductViewArray(products)
  })

  // Fetch data from LS
  useEffect(() => {   
    const data = localStorage.getItem('products') || "[]"
    if (data) {
      setProductViewArray(JSON.parse(data))
    }
  }, [])

  // Styling variables
  const productListContainer: CSSProperties = {
    backgroundImage: "url(./assets/imgs/what-the-hex.png)",
  };

  const listStyle: CSSProperties = {
    backgroundColor: "#EDEDED",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingTop: '1.5rem',
  };

  const styleCategories: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: '6rem'
  }

  const productListBtnStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  const pagesIconStyle: CSSProperties = {
    width: "5rem",
    height: "5rem",
    borderRadius: "500rem",
    backgroundColor: "#393939",
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 1rem",
  };

  const catButton: CSSProperties = {
      fontSize: "0.8rem",
      border: "1px solid grey",
      backgroundColor: "white"   
  }

  // The mapping of the product database
  const productData = productViewArray.slice(page, pageItems).map((product) => (
    <div key={product._id}>
      
      {/* Link is to show the right product on ProductPage.
      The product.id is set in the URL string, and shows the right product that has the ID. */}
      <ProductListCard
        productname={product.productname}
        price={product.price}
        image={product.image}
        id={product._id}
        stock={product.stock}
      />
    </div>
  ));

  // Goes back in the pagination
  const decrease = () => {
    const productListStart: number = productViewArray.length - productViewArray.length;
    const thisPage: number = page - pageNumbers;
    const thisPageItems: number = pageItems - pageNumbers;
    const thisPageNumber: number = pageNumber - 1;

    if (productListStart >= page) {
      return;
    } else {
      setPage(thisPage);
      setPageItems(thisPageItems);
      setPageNumber(thisPageNumber);
    }
  };

  // Goes forward in pagination
  const increase = () => {
    const productListEnd = productViewArray.length;

    const thisPage: number = page + pageNumbers;
    const thisPageItems: number = pageItems + pageNumbers;
    const thisPageNumber: number = pageNumber + 1;

    if (productListEnd <= pageItems) {
      return;
    } else {
      setPage(thisPage);
      setPageItems(thisPageItems);
      setPageNumber(thisPageNumber);
    }
  };

  // Categories
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    resetAllCategories()
    setPage(0);
      setPageItems(pageNumbers);
      setPageNumber(1);
    setAnchorEl(event.currentTarget);
  };


  const categoriesList = categories.map((c)=> (    
    <MenuItem onClick={() => {
    getCat(c._id)}}>{c.catName}</MenuItem>
  ))

 
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="productListContainer"
      style={productListContainer}
    >
      <Grid item style={styleCategories}>

        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleCategory}        
          className="hamb-menu-icon-btn"
          style={catButton}
        >
          Kategorier
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={resetAllCategories}>Alla Produkter</MenuItem>
            {categoriesList}
          </Menu>
      </Grid>
      <Grid container xs={12} md={10} style={infoLandingContainer}> 
        <Grid item style={listStyle}>
          {productData}
          <Grid item xs={12} className="productListBtn" style={productListBtnStyle}>   
            <IconButton onClick={decrease}>
              <ArrowBackIcon />
            </IconButton>
            <div className="pageCircle" style={pagesIconStyle}>
              <p>Sida {pageNumber}</p>
            </div>
            <IconButton onClick={increase}>
              <ArrowForwardIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const infoLandingContainer: CSSProperties = {
  maxWidth: "60rem",
  padding: "1rem 2rem 2rem 2rem",
  top: 0,
  bottom: 0,
  borderRadius: "15px",
  overflow: "hidden",
};

export default ProductList;
