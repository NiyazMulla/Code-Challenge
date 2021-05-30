import React, { Component } from "react";
import { Button } from "reactstrap";

export const BUTTON_LABEL = {
  ADD_TO_CART: "Add to Cart",
  CHECKOUT: "Checkout",
  APPLY: "Apply",
  PAYMENT: "Make Payment",
};

class ButtonBox extends Component {
  render() {
    return (
      <div>
        <Button {...this.props}>{this.props.label}</Button>
      </div>
    );
  }
}

export default ButtonBox;
