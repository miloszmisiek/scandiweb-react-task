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
    const cleanCart = {};
    cleanCart["products"] = this.props.cartItems
      .map(({ prices, attributes, gallery, ...r }) => {
        const { amount, currency } = prices.find(
          (price) => price.currency.symbol === this.props.currency.symbol
        );
        const { symbol } = currency;

        return {
          ...r,
          price: { amount, symbol },
        };
      })
      .reduce((group, item) => {
        const { id } = item;
        group[id] = group[id] ?? [];
        group[id].push(item);
        return group;
      }, {});
    cleanCart["total_amount"] = this.state.total;
    cleanCart["total_amount_currency"] = this.props.currency.code;
    console.log(cleanCart);
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
              {Object.values(
                this.props.cartItems
                  .map((item, idx) => (
                    <ProductInfo
                      key={item.id + "__" + idx}
                      productKey={item.id + "__" + idx}
                      {...item}
                      {...this.props}
                      cartPreview
                    />
                  ))
                  .reduce((group, item) => {
                    const { key } = item;
                    group[key.split("__")[0]] = group[key.split("__")[0]] ?? [];
                    group[key.split("__")[0]].push(item);
                    return group;
                  }, {})
              )}
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
