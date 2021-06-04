import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { useOrderContext } from '../../Context/OrderContext'
import Orders from "./Orders";
import Products from "./Products";

function Admin() {
  const authContext = useAuth();
  const importOrders = useOrderContext()

  const [displayProducts, setDisplayProducts] = useState(true);

  const showProducts = (e: any) => {
    setDisplayProducts(true);
  };

  const showOrders = (e: any) => {
    setDisplayProducts(false);    
  };

  useEffect(() => {
    importOrders.fetchOrders()
  }, [importOrders])

  if (authContext === undefined) {
    return <Redirect to="/Login" />;
  }
  if (!authContext.isAdmin) {
    return <Redirect to="/Login" />;
  } else {
    return (
      <>
        <div className="admin-buttons">
          <button className="products-admin-btn" onClick={showProducts}>
            Visa Produkter
          </button>
          <button className="orders-admin-btn" onClick={showOrders}>
            Visa Ordrar
          </button>
        </div>
        {displayProducts ? <Products /> : <Orders />}
      </>
    );
  }
}

export default Admin;
