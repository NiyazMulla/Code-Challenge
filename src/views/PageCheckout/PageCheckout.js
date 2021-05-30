import React, { Component } from "react";
import { Col, Input, Row } from "reactstrap";
import ButtonBox, { BUTTON_LABEL } from "../../components/ButtonBox/ButtonBox";
import { getCartItems, getTotalPrice } from "../../services/UtilServices";

const PROMO_CODES = [
  {
    code: "RRD4D32",
    desciption: "10% discount for orders above $5000 (pre-discount)",
  },
  {
    code: "44F4T11",
    desciption: "15% discount for orders above $10000 (pre-discount)",
  },
];

class PageCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      promoCode: "",
      discountAmount: 0,
      payAmount: Number.parseFloat(getTotalPrice()).toFixed(2),
    };
  }

  componentDidMount() {
    this.setState({
      cartList: getCartItems(),
    });
  }

  updateCart = (e, data) => {
    console.log("data>>", e.target.value, data);
    let oldCarItems = getCartItems();
    let cartItems = [...this.state.cartList];
    let productExits = cartItems.find((key) => {
      if (key.recordId === data.recordId) {
        data.quantity = parseFloat(e.target.value);
        data.total = parseFloat(data.quantity) * parseFloat(data.price);
      }
    });
    sessionStorage.removeItem("cartItems");
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

    setTimeout(() => {
      this.setState(
        {
          cartList: getCartItems(),
        },
        () => {
          let totalAmount = getTotalPrice();
          let payAmount = this.state.payAmount;
          let errorMessage = "";
          let promoCode = this.state.promoCode;
          if (totalAmount > 5000) {
            payAmount = totalAmount - this.state.discountAmount;
          } else {
            payAmount = totalAmount;
            errorMessage = "total amount has to be greater than 5000";
            promoCode = "";
          }

          this.setState({
            promoCode,
            errorMessage,
            payAmount,
          });
        }
      );
    }, 500);
  };

  validatePromocode = () => {
    console.log(this.state.promoCode);
    let totalAmount = getTotalPrice();
    let payAmount = this.state.payAmount;
    if (this.state.promoCode) {
      let isValidCode = PROMO_CODES.find((data, index) => {
        return data.code === this.state.promoCode;
      });
      if (isValidCode) {
        if (this.state.promoCode === "RRD4D32") {
          if (totalAmount > 5000) {
            let discountAmount = (totalAmount * 10) / 100;
            payAmount = totalAmount - discountAmount;
            console.log(payAmount);
            this.setState({
              discountAmount,
              payAmount: Number.parseFloat(payAmount.toFixed(2)),
            });
          } else {
            alert("this promo code will apply for orders above $5000");
          }
        } else if (this.state.promoCode === "44F4T11") {
          if (totalAmount > 10000) {
            let discountAmount = (totalAmount * 10) / 100;
            payAmount = totalAmount - discountAmount;
            console.log(payAmount);
            this.setState({
              discountAmount,
              payAmount: Number.parseFloat(payAmount.toFixed(2)),
            });
          } else {
            alert("this promo code will apply for orders above $10000");
          }
        }
      } else {
        alert("Please Enter valid promo code");
      }
    } else {
      alert("Please Enter promoCode");
    }
  };

  render() {
    return (
      <div className="p-2">
        {this.state.cartList.length > 0 ? (
          this.state.cartList.map((data, index) => {
            return (
              <Row className="mx-0 border mt-2 rounded" key={data.recordId}>
                <Col xs="12" sm="6" md="4" lg="3">
                  <div className="font-weight-normal">
                    Product Id: {data.productId}
                  </div>
                  <div className="font-weight-bold">
                    Product Name:{data.productName}
                  </div>
                  <div>Prodcut Price:{data.price}</div>
                </Col>
                <Col xs="12" sm="6" md="4" lg="4">
                  <Row>
                    <Col xs="4" sm="4" md="4" lg="4">
                      <Input
                        type="select"
                        value={data.quantity}
                        onChange={(e) => this.updateCart(e, data)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </Input>{" "}
                    </Col>
                    <Col xs="4" sm="4" md="2" lg="2">
                      X
                    </Col>
                    <Col xs="4" sm="4" md="4" lg="4">
                      {data.price}
                    </Col>
                  </Row>
                </Col>
                <Col xs="12" sm="6" md="4" lg="4">
                  Total: {Number.parseFloat(data.total).toFixed(2)}
                </Col>
              </Row>
            );
          })
        ) : (
          <div className="text-center">No items in cart</div>
        )}

        <Row className="mx-0  mt-4">
          <Col sm="12" md="4" lg="4">
            <Row>
              <Col>Total Price:</Col>
              <Col>{Number.parseFloat(getTotalPrice()).toFixed(2)}</Col>
            </Row>
          </Col>
        </Row>
        <Row className="mx-0 mt-1">
          <Col sm="12" md="4" lg="4">
            <Row>
              <Col>Apply promo code:</Col>
            </Row>
            <Row>
              <Col>
                <Input
                  type="text"
                  className="text-uppercase"
                  value={this.state.promoCode}
                  onChange={(e) => {
                    this.setState({
                      errorMessage: "",
                      promoCode: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col>
                <ButtonBox
                  label={BUTTON_LABEL.APPLY}
                  color="warning"
                  onClick={this.validatePromocode}
                />
              </Col>
            </Row>
            <>
              {PROMO_CODES.map((data, index) => {
                return (
                  <Row className="text-info">
                    <div>
                      {data.code}:{` ${data.desciption}`}
                    </div>
                  </Row>
                );
              })}
            </>
            {this.state.errorMessage ? (
              <Row className="text-danger">
                <div>{this.state.errorMessage}</div>
              </Row>
            ) : (
              ""
            )}
            <Row className="mt-2 text-success">
              <Col>Pay Amount:</Col>
              <Col>{this.state.payAmount}</Col>
            </Row>
          </Col>
        </Row>

        <Row className="mx-0 mt-2">
          <Col>
            <ButtonBox
              label={BUTTON_LABEL.PAYMENT}
              color="primary"
              onClick={() => {
                alert("Thanks for your order \n Continue Shopping!!!");
                sessionStorage.clear();
                window.location.href = "/";
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PageCheckout;
