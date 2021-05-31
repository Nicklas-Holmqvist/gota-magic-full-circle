import React from "react";
import LandingPage from "./LandingPage";
import ProductList from "./ProductList";
import Footer from "./Footer";
import Header from "./headerComponent/Header";
import ProductPage from "./ProductPage";
import BreadCrumbs from "./BreadCrumbs";
import Tournaments from "./Tournaments";
import Admin from "./admin/Admin";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import ErrorBoundary from "./ErrorBoundary";
import Login from "./Login";
import Register from "./Register";

import { Switch, Route, BrowserRouter } from "react-router-dom";
import ProductCart from "./cartComponent/ProductCart";
import MissingPage from "./MissingPage";

function Layout() {
  return (
    <BrowserRouter>
      <Header />
      <ErrorBoundary>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/Tournaments" component={Tournaments} />
          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/Admin" component={Admin} />
          <Route path="/Contact" component={Contact} />
          <Route path="/ProductList" component={ProductList} />
          <Route path="/ProductCart" component={ProductCart} />

          <Route path="/BreadCrumbs" component={BreadCrumbs} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          {/* :id is put behind the ProductPage/ to use the id that is put in the link tag in ProductList.tsx */}
          <Route path="/ProductPage/:id" component={ProductPage} />
          <MissingPage />
        </Switch>
      </ErrorBoundary>
      <Footer />
    </BrowserRouter>
  );
}

export default Layout;
