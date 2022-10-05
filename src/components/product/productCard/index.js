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
import preview from "../../../assets/product-preview-test.png";
import cart from "../../../assets/logo/add-cart-button.svg";

export class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCartVisibile: false,
    };
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
        <ImagePreview src={preview}></ImagePreview>
        <ProductCardData>
          <ProductTitleBrand>Apollo Running Short</ProductTitleBrand>
          <ProductCardPrice>
            <span>{this.props.currency}</span>50.00
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
