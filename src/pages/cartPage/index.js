import React, { Component } from "react";
import ProductInfo from "../../components/product/productInfo";
import { roundNumber } from "../../utils/utils";
import {
  CartHeading,
  CartItemsContainer,
  CartPageDivider,
  CartSummaryContainer,
  CartSummaryElements,
  CartSummaryRow,
  OrderButton,
} from "./style";

export class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemsCount: 0,
      total: 0,
    };
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
    const { cartItems, currency } = this.props;
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <CartHeading>Cart</CartHeading>
        <CartItemsContainer>
          {Object.values(
            cartItems
              .map((item, idx) => (
                <React.Fragment key={item.id + "__" + idx}>
                  <CartPageDivider />
                  <ProductInfo
                    cartPage
                    {...item}
                    {...this.props}
                    productKey={item.id + "__" + idx}
                  />
                </React.Fragment>
              ))
              .reduce((group, item) => {
                const { key } = item;
                group[key.split("__")[0]] = group[key.split("__")[0]] ?? [];
                group[key.split("__")[0]].push(item);
                return group;
              }, {})
          )}

          <CartPageDivider />
          <CartSummaryContainer>
            <CartSummaryRow>
              <CartSummaryElements left>
                <div>Tax 21%:</div>
                <div>Quantity:</div>
                <div>Total:</div>
              </CartSummaryElements>
              <CartSummaryElements>
                <div>
                  {currency.symbol}
                  {roundNumber(this.state.total * 0.21)}
                </div>
                <div>{this.state.cartItemsCount}</div>
                <div>
                  {currency.symbol}
                  {this.state.total}
                </div>
              </CartSummaryElements>
            </CartSummaryRow>
            <OrderButton checkout>order</OrderButton>
          </CartSummaryContainer>
        </CartItemsContainer>
      </form>
    );
  }
}

export default CartPage;
