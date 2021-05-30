import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { PRODUCT_LIST } from "../../assets/StaticData";
import ButtonBox, { BUTTON_LABEL } from "../../components/ButtonBox/ButtonBox";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getCartItems } from "../../services/UtilServices";

class PageProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: PRODUCT_LIST,
    };
  }

  addToCart = (data) => {
    console.log(data);
    if (sessionStorage.getItem("cartItems")) {
      let cartItems = getCartItems();
      let productExits = cartItems.find(
        (key) => key.recordId === data.recordId
      );
      if (productExits) {
        alert("Item Already exist in the cart");
        return;
      }
    }
    data.quantity = 1;
    data.total = parseFloat(data.quantity) * parseFloat(data.price);
    let cartItems = getCartItems();
    let addToCartList = [...cartItems, { ...data }];
    sessionStorage.setItem("cartItems", JSON.stringify(addToCartList));
  };

  render() {
    return (
      <div className="p-2">
        <Row className="mx-0">
          {this.state.productList.length > 0 ? (
            this.state.productList.map((data, index) => {
              return (
                <Col xs="12" sm="6" md="4" lg="4" key={data.recordId}>
                  <ProductCard
                    productId={data.productId}
                    productName={data.productName}
                    price={data.price}
                    onClick={() => this.addToCart(data)}
                  />
                </Col>
              );
            })
          ) : (
            <></>
          )}
        </Row>

        <Row className="mx-0 mt-4">
          <Col className="text-right" xs="12" sm="12" md="12" lg="2">
            <ButtonBox
              label={BUTTON_LABEL.CHECKOUT}
              onClick={() => {
                this.props.history.push("/checkout");
              }}
            />
          </Col>
        </Row>

        <Row className="mx-0 mt-5 text-left justify-content-center">
          <Col className="fw-bold">
            Improvement needed in following points :
            <div>
              I.After adding the items in cart please do refersh number of items
              will be displayed in header Like Badge :)
            </div>
            <div>II. Without refersh also we can do with the help of redux</div>
            <div>III.In Cart Page Delete Functionality is not implented</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PageProductList;
