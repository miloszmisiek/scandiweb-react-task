import React, { Component } from "react";
import {
  AmountContainer,
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
import { roundNumber } from "../../../utils/utils";
import { withRouter } from "react-router-dom";

export class CartPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      cartItemsCount: 0,
      total: 0,
    };
    this.handleExpanded = this.handleExpanded.bind(this);
  }

  componentDidMount() {
    this.setState((prevState) => ({
      ...prevState,
      cartItemsCount: this.props.cartItems
        ?.map((item) => item.quantity)
        .reduce((prev, curr) => prev + curr, 0),
      total: roundNumber(
        this.props.cartItems
          .map((item) => ({
            prices: item.prices?.filter(
              (price) => price.currency.symbol === this.props.currency.symbol
            )[0],
            quantity: item.quantity,
          }))
          .reduce(
            (total, item) => total + (item.prices?.amount || 0) * item.quantity,
            0
          )
      ),
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartItems !== prevProps.cartItems) {
      this.setState((prevState) => ({
        ...prevState,
        cartItemsCount: this.props.cartItems
          ?.map((item) => item.quantity)
          .reduce((prev, curr) => prev + curr, 0),
        total: roundNumber(
          this.props.cartItems
            .map((item) => ({
              prices: item.prices?.filter(
                (price) => price.currency.symbol === this.props.currency.symbol
              )[0],
              quantity: item.quantity,
            }))
            .reduce(
              (total, item) =>
                total + (item.prices?.amount || 0) * item.quantity,
              0
            )
        ),
      }));
    }
    if (this.props.currency.symbol !== prevProps.currency.symbol) {
      this.setState((prevState) => ({
        ...prevState,
        total: roundNumber(
          this.props.cartItems
            .map((item) => ({
              prices: item.prices?.filter(
                (price) => price.currency.symbol === this.props.currency.symbol
              )[0],
              quantity: item.quantity,
            }))
            .reduce(
              (total, item) =>
                total + (item.prices?.amount || 0) * item.quantity,
              0
            )
        ),
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

  handleSubmit(e) {
    e.preventDefault();
    const cartItems = new FormData();
    this.props.cartItems.forEach((item) => {
      cartItems.append(
        `${item.id}`,
        JSON.stringify({
          brand: item.brand,
          name: item.name,
          quantity: item.quantity,
          attributes: item.attributes.map((attr) => ({
            [attr.name.toLowerCase().replaceAll(" ", "_")]: attr.selected.value,
          })),
          price: item.prices.find(
            (price) => price.currency.symbol === this.props.currency.symbol
          ).amount,
        })
      );
    });
    cartItems.append("total_amount", this.state.total);
    cartItems.append("currency", this.props.currency.code);

    for (const pair of cartItems.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    this.handleClick();
    this.props.stateHandler();
  }

  render() {
    return (
      <Basket onSubmit={(e) => this.handleSubmit(e)}>
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
              {this.props.cartItems.map((item, idx) => (
                <ProductInfo
                  key={item.id + "-" + idx}
                  productKey={item.id + "-" + idx}
                  {...item}
                  {...this.props}
                  cartPreview
                />
              ))}
            </ProductsContainer>
            <TotalContainer>
              <TotalText>Total</TotalText>
              <AmountContainer>
                <span>
                  <TotalValue currency>{this.props.currency.symbol}</TotalValue>
                  <TotalValue>{this.state.total}</TotalValue>
                </span>
              </AmountContainer>
            </TotalContainer>
            <CartPrevButtons>
              <CartPrevButton
                onClick={() => {
                  this.handleClick();
                  this.props.stateHandler();
                  this.props.history.push(
                    `/cart/${this.props.currency.code.toLowerCase()}`
                  );
                }}
              >
                VIEW BAG
              </CartPrevButton>
              <CartPrevButton type="submit" checkout>
                CHECK OUT
              </CartPrevButton>
            </CartPrevButtons>
          </Dropdown>
        )}
      </Basket>
    );
  }
}

export default withRouter(CartPreview);
