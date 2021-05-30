import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Badge } from "reactstrap";
import { getCartItems } from "../../services/UtilServices";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="p-2 bg-danger text-white">
        <Row className="mx-0">
          <Col xs="6" sm="6" md="1" lg="1">
            <Link to="/" className="text-decoration-none text-white">
              Home
            </Link>
          </Col>
          <Col xs="6" sm="6" md="10" lg="10">
            Cartitem{" "}
            <Badge color="primary">
              {getCartItems().length > 0 ? getCartItems().length : ""}
            </Badge>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
