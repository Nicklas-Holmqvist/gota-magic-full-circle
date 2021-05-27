import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  ButtonGroup,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import "../main.css";
import { useProductContext } from "../Context/ProductContext";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
interface Props {
  image: string;
  productname: string;
  price: number;
  id: string;
  stock: number;
}

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    margin: "1rem",
  },
  cardContent: {
    padding: "1rem 2rem",
  },
  media: {
    height: 230,
  },
  font: {
    textAlign: "center",
    fontSize: "1rem",
  },
  centerBtnLeft: {
    fontSize: "0.8rem",
    border: "1px solid grey",
    background: "#FF7A2F",
  },
  centerBtnRight: {
    fontSize: "0.8rem",
    border: "1px solid grey",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  },
  linkStyle: {
    textDecoration: "none",
  },
});

function ProductListCard(props: Props) {
  const getProductId = useProductContext();
  const usecart = useCart();
  const style = useStyles();
  const [dbStock, setDbStock] = useState(props.stock);
  console.log(props.productname, dbStock);
  useEffect(() => {
    updateStock(props.stock);
  }, [usecart.cart]);
  // ;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card className={style.card}>
          <CardContent className={style.cardContent}>
            <CardMedia className={style.media} image={props.image} />
            <CardActions>
              <ButtonGroup>
                <Button
                  disabled={dbStock >= 1 ? false : true}
                  onClick={() => {
                    if (props.stock > 0 || null) {
                      usecart.addToCart(
                        props.productname,
                        props.price,
                        props.image,
                        props.id
                      );
                    } else {
                      alert("Inget i lager!");
                      return;
                    }
                    updateStock(props.stock);
                  }}
                  className={style.centerBtnLeft}
                >
                  Köp
                </Button>

                <Link
                  to={`/ProductPage/${props.id}`}
                  className={style.linkStyle}
                >
                  <Button
                    className={style.centerBtnRight}
                    onClick={() => {
                      getProductId.getIdFromProductList(props.id);
                    }}
                  >
                    Läs mer
                  </Button>
                </Link>
              </ButtonGroup>
            </CardActions>
            <Typography className={style.font}>{props.productname}</Typography>
            <Typography className={style.font}>{props.price} kr</Typography>
            <Typography className={style.font}>
              {dbStock >= 1 ? "I Lager" : "Ej i lager"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  function updateStock(stock: number) {
    let cartQuantity = 0;
    const cartProduct = usecart.cart.filter((obj) => {
      return props.id === obj.id;
    });
    cartProduct.forEach((obj) => {
      cartQuantity = obj.quantity;
    });
    let newStock = stock - cartQuantity - 1;
    setDbStock(newStock);
    console.log(cartQuantity);
  }
}

export default ProductListCard;
