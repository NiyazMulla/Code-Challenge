import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardFooter } from "reactstrap";
import ButtonBox, { BUTTON_LABEL } from "../ButtonBox";

class ProductCard extends Component {
  render() {
    return (
      <>
        <Row className="mx-0">
          <Col xs="12" md="12" lg="12">
            <Card>
              <CardBody>
                <div className="font-weight-normal">{this.props.productId}</div>
                <div className="font-weight-bold">{this.props.productName}</div>
                <div>{this.props.price} / Per Month</div>
              </CardBody>
              <CardFooter>
                <ButtonBox
                  label={BUTTON_LABEL.ADD_TO_CART}
                  color="danger"
                  onClick={this.props.onClick}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default ProductCard;
