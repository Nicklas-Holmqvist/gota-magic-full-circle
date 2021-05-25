
import { Button } from "@material-ui/core";
import "../main.css";
import "../css/productPage.css";

// This is to get the URL from browser
import { useParams } from "react-router-dom";

import { Product } from "../DB/Products";
import { useProducts } from "../Context/ProductContext";
import { CSSProperties } from "@material-ui/styles";
import { useCart } from "../Context/CartContext";

function ProductPage() {
  const stylingImg: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  const stylingProductInfo: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };

  // Import context
  const products: Product[] = useProducts();
  const params = useParams<{ id: string }>();
  const cart = useCart();
  // Default product to stop error when a product is choosen to display
  const product = products.find((p) => String(p._id) === params.id);

  if (!product) {
    return <p>Det här magikortet verkar inte finnas.</p>;
  }

  return (
    <div className="background">
      <div className="grey-card" style={cardStyle}>
        <div className="container">
          <div className="top flex">
            <div className="image-container flex" style={stylingImg}>
              <img src={product.image} alt="" />
            </div>

            <div
              className="info-content flex column"
              style={stylingProductInfo}
            >
              <h2>{product.productname}</h2>
              <h4>{product.cardtype}</h4>
              <p>Färg: {product.color}</p>
              <p>CMC: {product.cmc}</p>
              <p>Expansion: {product.expansion}</p>

              <h2 className="price-text">{product.price} kr</h2>
             
              <Button
                onClick={() =>
                  cart.addToCart(
                    product.productname,
                    product.price,
                    product.image,
                    product._id
                  )
                }
                variant="contained"
                color="primary"
                className="add-to-cart-btn"
              >
                Lägg i varukorg
              </Button>
            </div>
          </div>

          <div className="bottom flex">
            <div className="desc flex column">
              <h3>Produktbeskrivning</h3>
              <p>{product.cardtext}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle: CSSProperties = {
  marginTop: "6rem",
};

export default ProductPage;
