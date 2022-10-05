import React, { Component } from "react";
import {
  Basket,
  CartPrevButton,
  CartPrevButtons,
  CartPrevTitle,
  MyBag,
  ProductsContainer,
} from "./style";
import cart from "../../../assets/logo/cart-logo.svg";
import Dropdown from "../../currencyConverter/dropdownMenu";
import ProductInfo from "../../product/productInfo";

export class CartPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.handleExpanded = this.handleExpanded.bind(this);
  }

  handleExpanded(event) {
    if (event.target.id !== "basketToggle") {
      this.setState((prevState) => ({
        ...prevState,
        isExpanded: false,
      }));
    }
  }

  handleClick() {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  }

  render() {
    return (
      <Basket>
        <img
          id="basketToggle"
          src={cart}
          alt="Cart icon"
          onClick={() => {
            this.handleClick();
            this.props.stateHandler();
          }}
        />
        {this.state.isExpanded && (
          <Dropdown
            stateHandler={this.handleExpanded}
            overlayHandler={this.props.stateHandler}
            cart
          >
            <CartPrevTitle>
              <MyBag bag>My Bag</MyBag>
              <MyBag>3 items</MyBag>
            </CartPrevTitle>
            <ProductsContainer>
              <ProductInfo />
              <ProductInfo />
              <ProductInfo />
            </ProductsContainer>
            <CartPrevButtons>
              <CartPrevButton
                onClick={() => {
                  this.handleClick();
                  this.props.stateHandler();
                }}
              >
                VIEW BAG
              </CartPrevButton>
              <CartPrevButton
                checkout
                onClick={() => {
                  this.handleClick();
                  this.props.stateHandler();
                }}
              >
                CHECKOUT
              </CartPrevButton>
            </CartPrevButtons>
          </Dropdown>
        )}
      </Basket>
    );
  }
}

export default CartPreview;
