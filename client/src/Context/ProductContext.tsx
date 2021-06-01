import React, {
  useState,
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
} from "react";

import { Product, Categories } from "../DB/Products";
export const ProductContext = createContext<Context>(undefined!);

// Typing for items in ProductProvider
type Context = {
  filterProduct: Product[];
  products: Product[];
  getProductView: Product[];
  categories: [];
  addProduct: (product: Product) => void;
  getIdFromProductList: (id: string) => void;
  ProductArray: (product: Product[]) => void;
  getCategory: (id: string) => void;
  setAllProducts: () => void;
};

export const ProductProvider: FunctionComponent = ({ children }) => {
  const newList:Product[] = []
  const [products, setProducts] = useState<Product[]>([]);
  const [filterProduct, setFilterProduct] = useState<Product[]>(products);


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

  useEffect(() => {
    setFilterProduct(products)
  }, [products, setFilterProduct])

  const setAllProducts = () => {
    setFilterProduct(products)
  }

  const getCategory = (id:string) => {
    setProducts(products)

    const filteredCategories:Product[] = products.filter((p) => {     

      const cat:Categories[] = p.categories
      const product = p

      const filtered = cat.filter((c) => {
        if(c._id === id) {
          return newList.push(product)          
        } else {
          return null
        }
      })
      setFilterProduct(newList)
      return filtered
    })
    return filteredCategories
  }
  
  const ProductArray = (products: Product[]) => {
    setProducts(products);
  };

  const getProductView = products.filter((p) => {
    if (p._id === productId) {
      return productId;
    }
    return null;
  });

  useEffect(() => {

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
          setCategories(data);
        })
        .catch(function (err) {
          console.error(err);
        });
    };
  
    fetchCategories()
  },[setCategories])
  

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        getProductView,
        addProduct,
        getIdFromProductList,
        ProductArray,
        getCategory,
        filterProduct,
        setAllProducts
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
