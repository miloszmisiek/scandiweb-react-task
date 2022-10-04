import React, { Component } from "react";
import { Basket } from "./style";
import cart from "../../../assets/logo/cart-logo.svg";
import Dropdown from "../../currencyConverter/dropdownMenu";

export class CartPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.stateHandler = this.stateHandler.bind(this);
  }

  stateHandler(event) {
    if (event.target.id !== "basketToggle") {
      this.setState({
        isExpanded: false,
      });
    }
  }

  handleClick() {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  }

  render() {
    return (
      <Basket onClick={() => this.handleClick()}>
        <img id="basketToggle" src={cart} alt="Cart icon" />
        {this.state.isExpanded && (
          <Dropdown stateHandler={this.stateHandler}>
            text
          </Dropdown>
        )}
      </Basket>
    );
  }
}

export default CartPreview;
