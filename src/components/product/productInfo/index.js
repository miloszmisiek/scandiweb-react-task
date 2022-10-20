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
    console.log(this.props.attributes);
    const priceAmount = this.state.displayCurrency.amount;
    return (
      <ProductInfoContainer>
        <ProductInfoLeftContainer>
          <ProductTitle>{this.props.brand}</ProductTitle>
          <ProductType>{this.props.name}</ProductType>
          <Price>
            <span>{this.state.displayCurrency.currency?.symbol}</span>{" "}
            {priceAmount}
          </Price>
          {this.props.attributes.map((attr) => (
            <React.Fragment key={attr.name}>
              <SizeChartContainer>
                <SizeTitle>{attr.name}:</SizeTitle>
                <SizeOptionsContainer>
                  {attr.items.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <SizeOptionInput
                        type="radio"
                        // defaultChecked={idx === 0}
                        checked={attr.selected.value === item.value}
                        id={
                          "cart-" + this.props.id + "-" + attr.name + "-" + idx
                        }
                        name={"cart-" + this.props.id + "-" + attr.name}
                        value={item.value}
                        swatch={attr.type === "swatch" ? item : undefined}
                        onChange={(e) =>
                          this.props.setSelectedAttribiute(
                            this.props.id,
                            attr.name,
                            item
                          )
                        }
                      />
                      <SizeOption
                        cartPreview
                        htmlFor={
                          "cart-" + this.props.id + "-" + attr.name + "-" + idx
                        }
                        key={item.displayValue}
                        swatch={attr.type === "swatch" ? item : undefined}
                        value={attr.type !== "swatch" && item.displayValue}
                      >
                        {attr.type !== "swatch" ? (
                          item.value
                        ) : (
                          <ColorBox swatch={item}></ColorBox>
                        )}
                      </SizeOption>
                    </React.Fragment>
                  ))}
                </SizeOptionsContainer>
              </SizeChartContainer>
            </React.Fragment>
          ))}
        </ProductInfoLeftContainer>
        <ProductInfoRightContainer>
          <QuantityContainer>
            <QuantityButton
              onClick={(e) => {
                e.preventDefault();
                this.props.increaseCartQuantity(this.props.id);
              }}
            >
              +
            </QuantityButton>
            <QuantityNumber>{this.props.quantity}</QuantityNumber>
            <QuantityButton
              onClick={(e) => {
                e.preventDefault();
                this.props.decreaseCartQuantity(this.props.id);
              }}
            >
              -
            </QuantityButton>
          </QuantityContainer>
          <ProductImagePreview src={this.props.gallery[0]} />
        </ProductInfoRightContainer>
      </ProductInfoContainer>
    );
  }
}

export default ProductInfo;
