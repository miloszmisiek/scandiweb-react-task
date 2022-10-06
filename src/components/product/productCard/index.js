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

export class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCartVisibile: false,
      displayCurrency: this.props.product.prices.filter(
        (price) => price.currency.symbol === this.props.currency
      )[0],
    };
    console.log(this.state.displayCurrency);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currency !== prevProps.currency) {
      this.setState((prevState) => ({
        ...prevState,
        displayCurrency: this.props.product.prices.filter(
          (price) => price.currency.symbol === this.props.currency
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
      >
        <ImagePreview src={this.props.product.gallery[0]}></ImagePreview>
        <ProductCardData>
          <ProductTitleBrand>
            {this.props.product.brand}
            {this.props.product.name}
          </ProductTitleBrand>
          <ProductCardPrice>
            <span>{this.state.displayCurrency.currency.symbol}</span>
            {this.state.displayCurrency.amount}
          </ProductCardPrice>
        </ProductCardData>
        {this.state.addCartVisibile && (
          <AddToCartButton>
            <CartIcon src={cart} />
          </AddToCartButton>
        )}
      </ProductCardContainer>
    );
  }
}

export default ProductCard;
