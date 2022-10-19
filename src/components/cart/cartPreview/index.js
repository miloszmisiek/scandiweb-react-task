import React, { Component } from "react";
import {
  Basket,
  CartIcon,
  CartItemsCounter,
  CartPrevButton,
  CartPrevButtons,
  CartPrevTitle,
  MyBag,
  ProductsContainer,
  TotalContainer,
  TotalText,
  TotalValue,
} from "./style";
import cart from "../../../assets/logo/cart-logo.svg";
import Dropdown from "../../currencyConverter/dropdownMenu";
import ProductInfo from "../../product/productInfo";

export class CartPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      cartItemsCount: 0,
    };
    this.handleExpanded = this.handleExpanded.bind(this);
  }

  componentDidMount() {
    this.setState((prevState) => ({
      ...prevState,
      cartItemsCount: this.props.cartItems
        ?.map((item) => item.quantity)
        .reduce((prev, curr) => prev + curr, 0),
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartItems !== prevProps.cartItems) {
      this.setState((prevState) => ({
        ...prevState,
        cartItemsCount: this.props.cartItems
          ?.map((item) => item.quantity)
          .reduce((prev, curr) => prev + curr, 0),
      }));
    }
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
        {!!this.props.cartItems?.length && (
          <CartItemsCounter>{this.state.cartItemsCount}</CartItemsCounter>
        )}
        <CartIcon
          id="basketToggle"
          onClick={(event) => {
            this.handleClick(event);
            this.props.stateHandler();
          }}
          src={cart}
          alt="Cart icon"
        />
        {this.state.isExpanded && (
          <Dropdown
            stateHandler={this.handleExpanded}
            overlayHandler={this.props.stateHandler}
            cart
          >
            <CartPrevTitle>
              <MyBag bag>My Bag</MyBag>
              <MyBag>
                {this.state.cartItemsCount}{" "}
                {this.state.cartItemsCount === 1 ? "item" : "items"}
              </MyBag>
            </CartPrevTitle>
            <ProductsContainer>
              {this.props.cartItems.map((item) => (
                <ProductInfo
                  key={item.id}
                  {...item}
                  currency={this.props.currency}
                  totalHandler={this.totalHandler}
                />
              ))}
            </ProductsContainer>
            <TotalContainer>
              <TotalText>Total</TotalText>
              <span>
                <TotalValue>{this.props.currency.symbol}</TotalValue>
                <TotalValue>
                  {this.props.cartItems
                    .map((item) => ({
                      prices: item.prices.filter(
                        (price) =>
                          price.currency.symbol === this.props.currency.symbol
                      )[0],
                      quantity: item.quantity,
                    }))
                    .reduce(
                      (total, item) =>
                        total + (item.prices.amount || 0) * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </TotalValue>
              </span>
            </TotalContainer>
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
