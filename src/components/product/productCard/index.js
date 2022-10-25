import React, { Component } from "react";
import {
  AddToCartButton,
  CartIcon,
  ImagePreview,
  OutOfStock,
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
        onClick={(e) =>
          e.target.id !== "add-cart-button" &&
          e.target.id !== "cart-icon" &&
          this.props.history.push(
            `/${
              this.props.category.name
            }/${this.props.currency.code.toLowerCase()}/${
              this.props.product.id
            }`
          )
        }
      >
        {!this.props.product.inStock && <OutOfStock>out of stock</OutOfStock>}
        <ImagePreview src={this.props.product.gallery[0]} />
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
        {this.state.addCartVisibile && this.props.product.inStock && (
          <AddToCartButton
            id="add-cart-button"
            onClick={() =>
              this.props.increaseCartQuantity(
                this.props.product.id,
                this.props.product.attributes.map((item) => ({
                  ...item,
                  selected: item.items[0],
                })),
                this.props.product.gallery,
                this.props.product.prices,
                this.props.product.brand,
                this.props.product.name
              )
            }
          >
            <CartIcon id="cart-icon" src={cart} />
          </AddToCartButton>
        )}
      </ProductCardContainer>
    );
  }
}

export default withRouter(ProductCard);
