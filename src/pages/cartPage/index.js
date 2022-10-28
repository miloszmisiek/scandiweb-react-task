import React, { Component } from "react";
import ProductInfo from "../../components/product/productInfo";
import { roundNumber } from "../../utils/utils";
import {
  CartHeading,
  CartItemsContainer,
  CartPageDivider,
  CartSummaryContainer,
  CartSummaryElement,
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
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <CartHeading>Cart</CartHeading>
        <CartItemsContainer>
          {this.props.cartItems.map((item, idx) => (
            <React.Fragment key={item.id + "-" + idx}>
              <CartPageDivider />
              <ProductInfo
                cartPage
                {...item}
                {...this.props}
                productKey={item.id + "-" + idx}
              />
            </React.Fragment>
          ))}
          <CartPageDivider />
          <CartSummaryContainer>
            <CartSummaryRow>
              <CartSummaryElements left>
                <CartSummaryElement>Tax 21%:</CartSummaryElement>
                <CartSummaryElement>Quantity:</CartSummaryElement>
                <CartSummaryElement>Total:</CartSummaryElement>
              </CartSummaryElements>
              <CartSummaryElements>
                <CartSummaryElement>
                  {this.props.currency.symbol}
                  {roundNumber(this.state.total * 0.21)}
                </CartSummaryElement>
                <CartSummaryElement>
                  {this.state.cartItemsCount}
                </CartSummaryElement>
                <CartSummaryElement>
                  {this.props.currency.symbol}
                  {this.state.total}
                </CartSummaryElement>
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
