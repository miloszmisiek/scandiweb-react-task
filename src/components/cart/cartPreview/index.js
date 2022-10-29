import React, { Component } from "react";
import {
  AmountContainer,
  Basket,
  CartButton,
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
import cart from "../../../assets/icons/cart-logo.svg";
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
    const { cartItems, currency } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      cartItemsCount: cartItems
        ?.map((item) => item.quantity)
        .reduce((prev, curr) => prev + curr, 0),
      total: roundNumber(
        cartItems
          .map((item) => ({
            prices: item.prices?.filter(
              (price) => price.currency.symbol === currency.symbol
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
    const { cartItems, currency } = this.props;
    if (cartItems !== prevProps.cartItems) {
      this.setState((prevState) => ({
        ...prevState,
        cartItemsCount: cartItems
          ?.map((item) => item.quantity)
          .reduce((prev, curr) => prev + curr, 0),
        total: roundNumber(
          cartItems
            .map((item) => ({
              prices: item.prices?.filter(
                (price) => price.currency.symbol === currency.symbol
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
    if (currency.symbol !== prevProps.currency.symbol) {
      this.setState((prevState) => ({
        ...prevState,
        total: roundNumber(
          cartItems
            .map((item) => ({
              prices: item.prices?.filter(
                (price) => price.currency.symbol === currency.symbol
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
    const { cartItems, currency } = this.props;
    e.preventDefault();
    const cleanCart = {};
    cleanCart["products"] = cartItems
      .map(({ prices, attributes, gallery, ...r }) => {
        const { amount, currency } = prices.find(
          (price) => price.currency.symbol === currency.symbol
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
    cleanCart["total_amount_currency"] = currency.code;
    Object.keys(cleanCart.products).length
      ? console.log(cleanCart)
      : console.log("No products = no shopping ;)");
  }

  render() {
    const { cartItems, currency, stateHandler, history } = this.props;
    return (
      <Basket onSubmit={(e) => this.handleSubmit(e)}>
        {!!cartItems?.length && (
          <CartItemsCounter>{this.state.cartItemsCount}</CartItemsCounter>
        )}
        <CartButton
          onClick={(e) => {
            e.preventDefault();
            this.handleClick(e);
            stateHandler();
          }}
        >
          <img id="basketToggle" src={cart} alt="Cart icon" />
        </CartButton>
        {this.state.isExpanded && (
          <Dropdown
            stateHandler={this.handleExpanded}
            overlayHandler={stateHandler}
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
                cartItems
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
                  <TotalValue currency>{currency.symbol}</TotalValue>
                  <TotalValue>{this.state.total}</TotalValue>
                </span>
              </AmountContainer>
            </TotalContainer>
            <CartPrevButtons>
              <CartPrevButton
                onClick={() => {
                  this.handleClick();
                  stateHandler();
                  history.push(`/cart/${currency.code.toLowerCase()}`);
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
