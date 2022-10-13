import React, { Component } from "react";
import {
  ColorOption,
  ColorOptionsContainer,
  ColorsContainer,
  ColorTitle,
  Price,
  ProductImagePreview,
  ProductInfoContainer,
  ProductInfoLeftContainer,
  ProductInfoRightContainer,
  ProductTitle,
  ProductType,
  QuantityButton,
  QuantityContainer,
  QuantityNumber,
  SizeChartContainer,
  SizeOption,
  SizeOptionsContainer,
  SizeTitle,
} from "./style";

import glasses from "../../../assets/product-test.png";

export class ProductInfo extends Component {
  render() {
    return (
      <ProductInfoContainer>
        <ProductInfoLeftContainer>
          <ProductTitle>{this.props.id}</ProductTitle>
          <ProductType>Running Short</ProductType>
          <Price>
            <span>$</span> 50.00
          </Price>
          <SizeChartContainer>
            <SizeTitle>Size:</SizeTitle>
            <SizeOptionsContainer>
              <SizeOption>XS</SizeOption>
              <SizeOption>S</SizeOption>
              <SizeOption>M</SizeOption>
              <SizeOption>L</SizeOption>
            </SizeOptionsContainer>
          </SizeChartContainer>
          <ColorsContainer>
            <ColorTitle>Color:</ColorTitle>
            <ColorOptionsContainer>
              <ColorOption></ColorOption>
              <ColorOption></ColorOption>
              <ColorOption></ColorOption>
            </ColorOptionsContainer>
          </ColorsContainer>
        </ProductInfoLeftContainer>
        <ProductInfoRightContainer>
          <QuantityContainer>
            <QuantityButton>+</QuantityButton>
            <QuantityNumber>{this.props.quantity}</QuantityNumber>
            <QuantityButton>-</QuantityButton>
          </QuantityContainer>
          <ProductImagePreview src={this.props.gallery[0]} />
        </ProductInfoRightContainer>
      </ProductInfoContainer>
    );
  }
}

export default ProductInfo;
