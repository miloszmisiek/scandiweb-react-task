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
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
  }
  render() {
    return (
      <ProductInfoContainer>
        <ProductInfoLeftContainer>
          <ProductTitle>Apollo</ProductTitle>
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
            <QuantityNumber>{this.state.quantity}</QuantityNumber>
            <QuantityButton>-</QuantityButton>
          </QuantityContainer>
          <ProductImagePreview src={glasses} />
        </ProductInfoRightContainer>
      </ProductInfoContainer>
    );
  }
}

export default ProductInfo;
