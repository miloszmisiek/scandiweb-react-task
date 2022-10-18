import React, { Component } from "react";
import {
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
  SizeOptionInput,
  SizeOptionsContainer,
  SizeTitle,
} from "./style";
import { ColorBox } from "../productPageInfo/style";

export class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCurrency: [],
    };
  }

  componentDidMount() {
    this.setState((prevState) => ({
      ...prevState,
      displayCurrency: this.props.prices.filter(
        (price) => price.currency.symbol === this.props.currency.symbol
      )[0],
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.currency.symbol !== prevProps.currency.symbol) {
      this.setState((prevState) => ({
        ...prevState,
        displayCurrency: this.props.prices.filter(
          (price) => price.currency.symbol === this.props.currency.symbol
        )[0],
      }));
    }
  }

  render() {
    const priceAmount = (
      this.state.displayCurrency.amount * this.props.quantity
    ).toFixed(2);
    return (
      <ProductInfoContainer>
        <ProductInfoLeftContainer>
          <ProductTitle>{this.props.brand}</ProductTitle>
          <ProductType>{this.props.name}</ProductType>
          <Price>
            <span>{this.state.displayCurrency.currency?.symbol}</span>{" "}
            {priceAmount}
          </Price>
          {this.props.attributes.map((item, idx) => (
            <React.Fragment key={item.id}>
              <SizeChartContainer>
                <SizeTitle>{item.name}:</SizeTitle>
                <SizeOptionsContainer>
                  <SizeOptionInput
                    type="radio"
                    defaultChecked
                    readOnly
                    id={
                      "cart-" +
                      item.name.toLowerCase() +
                      "-" +
                      this.props.id +
                      "-" +
                      idx
                    }
                    name={
                      "cart-" +
                      item.name.toLowerCase() +
                      "-" +
                      this.props.id +
                      "-" +
                      idx
                    }
                    value={item.items.value}
                    swatch={item.type === "swatch" ? item : undefined}
                  />
                  <SizeOption
                    htmlFor={
                      "cart-" +
                      item.name.toLowerCase() +
                      "-" +
                      this.props.id +
                      "-" +
                      idx
                    }
                    key={item.items.displayValue}
                    swatch={item.type === "swatch" ? item : undefined}
                    // onClick={(e) => this.handleClick(e)}
                    value={item.type !== "swatch" && item.displayValue}
                  >
                    {item.type !== "swatch" ? (
                      item.items.displayValue
                    ) : (
                      <ColorBox swatch={item.items}></ColorBox>
                    )}
                  </SizeOption>
                </SizeOptionsContainer>
              </SizeChartContainer>
            </React.Fragment>
          ))}
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
