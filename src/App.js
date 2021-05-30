import React, { Component } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProdutList from "./views/PageProductList";
import Checkout from "./views/PageCheckout";
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <ProdutList {...props} />}
            />
            <Route
              exact
              path="/checkout"
              render={(props) => <Checkout {...props} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
