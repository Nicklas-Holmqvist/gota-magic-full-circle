import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { orderItem } from "../Types/orderItem";

type Context = {
  getCartSize: () => number;
  addToCart: (
    productName: string,
    price: number,
    image: string,
    id: string
  ) => void;
  cart: orderItem[];
  removeFromCart: (productName: string) => void;
  decreaseQuantity: (item: orderItem) => void;
  totalPrice: number;
  ResetCart: () => void;
  resetCartLs: () => void;
  lsCart: orderItem[];
  cartTotalPrice: number;
};

const CartContext = createContext<Context>(undefined!);

export const CartContextProvider: FunctionComponent = ({ children }) => {
  const [cart, setCart] = useState<orderItem[]>([]);
  const [lsCart, setLsCart] = useState<orderItem[]>([]);
  const getCartSize = () => {
    return cart.length;
  };

  // Sätter totalpriset på LSvarukorgen + quantity //
  const totalPrice = lsCart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  // Sätter totalpriset på varukorgen + quantity //
  const cartTotalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const ResetCart = () => {
    getLsCart();
    setCart([...[]]);
  };

  const resetCartLs = () => {
    const cartData = localStorage.getItem("productCart") || "[]";
    if (cartData) {
      setLsCart([...JSON.parse(cartData)]);
    }
    localStorage.setItem("productCart", JSON.stringify([]));
  };

  useEffect(() => {
    const cartData = localStorage.getItem("productCart") || "[]";
    if (cartData) {
      setCart([...JSON.parse(cartData)]);
    }
  }, []);

  const getLsCart = () => {
    const cartData = localStorage.getItem("productCart") || "[]";
    if (cartData) {
      setLsCart([...JSON.parse(cartData)]);
    }
  };

  useEffect(() => {
    localStorage.setItem("productCart", JSON.stringify(cart));
  }, [cart]);

  // Lägger till produkt i varukorgen //
  const addToCart = (
    productName: string,
    price: number,
    image: string,
    id: string
  ) => {
    let existingItem = cart.find(
      (item) => item.productName === productName //Retunerar true eller false beroende på om det finns två item av samma namn //
    ) as orderItem;

    // skapar ett nytt orderitem med ökad quantity///
    let newItem: orderItem = {
      productName: productName,
      price: price,
      img: image,
      quantity: existingItem ? existingItem.quantity + 1 : 1, // om två item har samma namn ökar quantity med 1 //
      id: id,
    };

    // filtrerar bort items med samma namn som itemName //
    let newCart = [
      ...cart.filter((item) => {
        return item.productName !== productName;
      }),
    ];

    // skapar upp en ny cart med new item med eventuell ökad quantity //
    setCart([...newCart, newItem]);
  };

  // tar bort item från cart //
  const removeFromCart = (productName: string) => {
    let newCart = [
      ...cart.filter((item) => {
        return item.productName !== productName;
      }),
    ];
    setCart([...newCart]);
  };

  // minskar quantity om två lika dana item finns//
  const decreaseQuantity = (item: orderItem) => {
    let existingItem = cart.find(
      (i) => i.productName === item.productName
    ) as orderItem;

    let newItem: orderItem = {
      productName: existingItem.productName,
      price: existingItem.price,
      img: existingItem.img,
      quantity: existingItem.quantity - 1,
      id: existingItem.id,
    };

    let newCart = [
      ...cart.filter((i) => {
        return i.productName !== item.productName;
      }),
    ];

    // Tar bort itemet om quantity är mindre än 1 //
    if (newItem.quantity === 0) {
      setCart([...newCart]);
      return;
    }
    // Annars sätter det nya itemet med minskad quantity//
    setCart([...newCart, newItem]);
  };

  return (
    <CartContext.Provider
      value={{
        getCartSize,
        addToCart,
        cart,
        removeFromCart,
        decreaseQuantity,
        totalPrice,
        ResetCart,
        resetCartLs,
        lsCart,
        cartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext<Context>(CartContext);
