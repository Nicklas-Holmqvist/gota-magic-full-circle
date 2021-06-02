import { CSSProperties } from "@material-ui/styles";
import '../css/components.css';
import ProductListCard from "./ProductListCard";
import SearchError from "./SearchError";
import React, { useEffect, useState } from "react";
import {
  IconButton,
  Grid,
  // TextField,
  // Button,
  // makeStyles,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// import { useProducts } from "../Context/ProductContext";
import { useProductContext } from "../Context/ProductContext";

import { Product } from "../DB/Products";

interface Category {
  _id: string,
  catName: string
}

// const useStyles = makeStyles({
//   searchfield: {
//     background: "#EDEDED",
//   },
//   resetBtn: {
//     margin: "2rem 1rem 2rem 1rem",
//   },
// });

function ProductList() {

  const productContext = useProductContext()
  // Products from ProductsContext
  const products = productContext.filterProduct;
  // console.log({PRODUCTLIST: products})

  // const style = useStyles();

  // Number of items in productlist
  const pageNumbers = 12;

  const [page, setPage] = useState(0);
  const [pageItems, setPageItems] = useState(pageNumbers);
  const [pageNumber, setPageNumber] = useState(1);
  const [productViewArray, setProductViewArray] = useState<Product[]>(products);
  // const [searchValue, setSearchValue] = useState<string>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const getCat = productContext.getCategory
  const categories: Category[] = productContext.categories
  const resetAllCategories = productContext.setAllProducts

  console.log(products)

  useEffect(() => {
    setProductViewArray(products)
  },)

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
    paddingTop: '1rem'
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

  // const searchStyle: CSSProperties = {
  //   width: "100%",
  //   justifyContent: "center",
  //   display: "flex",
  //   marginRight: "1rem",
  // };

  // const formStyle: CSSProperties = {
  //   width: "100%",
  //   margin: "2rem 1rem",
  // };

  // End styling variables


  // const noResult = () => {
  //   <div><h2>Ingen träff</h2></div>
    
  // }

  

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

  

  // Filtering the product database with the searchvalue
  // The searchvalue is broken down with length to slice the product database value to the lenght of the searchvalue
  // Both value is formated to lowercase for easier compare
  // const filterdArray = products.filter((result) => {
    // const searchlength = searchValue?.length;
    // const productColor = result.color;
    // console.log(products)
    // const sliceProductColor = productColor.slice(0, searchlength);
    // const productName = result.productname;
    // const sliceProductName = productName.slice(0, searchlength);
    // const productCardtype = result.cardtype;
    // const sliceProductCardtype = productCardtype.slice(0, searchlength);

    // if (searchValue?.toLowerCase() === sliceProductColor.toLowerCase()) {
    //   return searchValue?.toLowerCase();
    // } else if (searchValue?.toLowerCase() === sliceProductName.toLowerCase()) {
    //   return searchValue?.toLowerCase();
    // } else if (
    //   searchValue?.toLowerCase() === sliceProductCardtype.toLowerCase()
    // ) {
    //   return searchValue?.toLowerCase();
    // }
  //   return null;
  // });

  // Reset the pagination values and set the setProductViewArray with the full product database values
  // And then sets the setProductViewArray to the filtered result
  // const searchArray = () => {
  //   setPage(0);
  //   setPageItems(pageNumbers);
  //   setPageNumber(1);
  //   setProductViewArray(products);
  //   // setProductViewArray(filterdArray);    
  // };

  // sets the input value to searchValue
  // const handleChange = (e: any) => {
  //   setSearchValue(e.target.value);
  //   searchArray();
  //   noResult()
  // };

  // When pressed it runs the seachArray function to show the search result
  // const handleSubmit = (evt: any) => {
  //   // correctAnswer(props.value)
  //   resetSearch();
  //   evt.preventDefault();
  // };

  // Reset the searchvalue and sets the input to blank
  // const resetSearch = () => {
  //   setPage(0);
  //   setPageItems(pageNumbers);
  //   setPageNumber(1);
  //   setProductViewArray(products);
  //   setSearchValue("");
  // };

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
      
      <div className="sok-test">
        {/* <Grid item xs={12} className="searchContainer" style={searchStyle}>
          <form onSubmit={handleSubmit} style={formStyle} autoComplete="off" >
            <TextField
              id="filled-basic"
              fullWidth
              label="Sök kort, minst två tecken"
              variant="filled"
              className={style.searchfield}
              value={searchValue}
              onChange={handleChange}
              autoFocus
              name="Sök här"
            />
          </form>
          <Button
            onClick={resetSearch}
            className={style.resetBtn}
            variant="contained"
            color="primary"
          >
            Reset
          </Button>
        </Grid>
        {noResult} */}

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
            {productViewArray.length === 0 ? <SearchError /> : null}
            <Grid
              item
              xs={12}
              className="productListBtn"
              style={productListBtnStyle}
            >
              
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
      </div>
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
