import React, {
  useState,
  createContext,
  FunctionComponent,
  useContext,
} from "react";

import { Product } from "../DB/Products";
export const ProductContext = createContext<Context>(undefined!);

// Typing for items in ProductProvider
type Context = {
  products: Product[];
  getProductView: Product[];
  categories: [];
  addProduct: (product: Product) => void;
  getIdFromProductList: (id: string) => void;
  ProductArray: (product: Product[]) => void;
};

export const ProductProvider: FunctionComponent = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [categories, setCategories] = useState<[]>([]);

  const [productId, setProductId] = useState<string>();

  // Add product to products
  const addProduct = (product: Product) => {};

  // Get ID from productList when pressing "LÄS MER"
  // Then filter products to set that to a new useState
  // This state is used by Context on productPage
  const getIdFromProductList = (id: string) => {
    // useProductContext(id)
    setProductId(id);
    // setViewProduct(getProductView)
  };

  const ProductArray = (products: Product[]) => {
    setProducts(products);
  };

  const getProductView = products.filter((p) => {
    if (p._id === productId) {
      return productId;
    }
    return null;
  });

  const options = {
    method: "get",
  };

  const fetchCategories = async () => {
    await fetch("/api/categories", options)
      .then(function (res) {
        if (res.status === 400) {
          return;
        }
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        setCategories(data);
      })
      .catch(function (err) {
        console.error(err);
      });
  };
  //   function changeQuantity(id: string) {
  //     const productExist = products.find((obj) => obj._id === id);
  //     if (productExist) {
  //       const newStock = productExist.stock - 1;
  //       let newProduct: Product = {
  //         productname: productExist.productname,
  //         cardtype: productExist.cardtype,
  //         color: productExist.color,
  //         cardtext: productExist.cardtext,
  //         expansion: productExist.expansion,
  //         cmc: productExist.cmc,
  //         image: productExist.image,
  //         _id: productExist._id,
  //         price: productExist.price,
  //         producttype: productExist.producttype,
  //         view: productExist.view,
  //         rating: productExist.rating,
  //         categories: productExist.categories,
  //         stock: newStock,
  //       };

  //       let newPoducts = [
  //         ...products.filter((obj) => {
  //           return obj._id !== id;
  //         }),
  //       ];

  //       setProducts([...newPoducts, newProduct]);
  //     }
  //   }
  // fetchCategories()

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        getProductView,
        addProduct,
        getIdFromProductList,
        ProductArray,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hooks

// Using all in ProductContext
export const useProductContext = () => useContext<Context>(ProductContext);
// Using only the products array
export const useProducts = () => {
  const value = useProductContext();
  return value.products;
};
