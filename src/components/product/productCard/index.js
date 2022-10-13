import React, { Component } from "react";
import {
  AddToCartButton,
  CartIcon,
  ImagePreview,
  ProductCardContainer,
  ProductCardData,
  ProductCardPrice,
  ProductTitleBrand,
} from "./style";
import cart from "../../../assets/logo/add-cart-button.svg";
import { withRouter } from "react-router-dom";

export class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCartVisibile: false,
      displayCurrency: "",
    };
  }

  componentDidMount() {
    this.setState((prevState) => ({
      ...prevState,
      displayCurrency: this.props.product.prices.filter(
        (price) => price.currency.symbol === this.props.currency.symbol
      )[0],
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.currency.symbol !== prevProps.currency.symbol) {
      this.setState((prevState) => ({
        ...prevState,
        displayCurrency: this.props.product.prices.filter(
          (price) => price.currency.symbol === this.props.currency.symbol
        )[0],
      }));
    }
  }

  render() {
    return (
      <ProductCardContainer
        onMouseEnter={() =>
          this.setState((prev) => ({ ...prev, addCartVisibile: true }))
        }
        onMouseLeave={() =>
          this.setState((prev) => ({ ...prev, addCartVisibile: false }))
        }
        onClick={() =>
          this.props.history.push(
            `/${
              this.props.category.name
            }/${this.props.currency.code.toLowerCase()}/${
              this.props.product.id
            }`
          )
        }
      >
        <ImagePreview src={this.props.product.gallery[0]}></ImagePreview>
        <ProductCardData>
          <ProductTitleBrand>
            {this.props.product.brand}
            {this.props.product.name}
          </ProductTitleBrand>
          <ProductCardPrice>
            <span>{this.state.displayCurrency.currency?.symbol}</span>
            {this.state.displayCurrency.amount}
          </ProductCardPrice>
        </ProductCardData>
        {this.state.addCartVisibile && (
          <AddToCartButton
            onClick={() =>
              this.props.increaseCartQuantity(
                this.props.product.id,
                this.props.product.attributes.map((attr) => ({
                  ...attr,
                  items: attr.items[0],
                })),
                this.props.product.gallery,
                this.state.displayCurrency.amount,
                this.state.displayCurrency.currency?.symbol
              )
            }
          >
            <CartIcon src={cart} />
          </AddToCartButton>
        )}
      </ProductCardContainer>
    );
  }
}

export default withRouter(ProductCard);
