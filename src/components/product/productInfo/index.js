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
    const priceAmount = this.state.displayCurrency?.amount;
    return (
      <ProductInfoContainer>
        <ProductInfoLeftContainer>
          <ProductTitle cartPage={!!this.props.cartPage}>
            {this.props.brand}
          </ProductTitle>
          <ProductType cartPage={!!this.props.cartPage}>
            {this.props.name}
          </ProductType>
          <Price cartPage={!!this.props.cartPage}>
            <span>{this.state.displayCurrency?.currency?.symbol}</span>
            {priceAmount}
          </Price>
          {this.props.attributes.map((attr, idx) => (
            <React.Fragment key={attr.name}>
              <SizeChartContainer>
                <SizeTitle cartPage={!!this.props.cartPage}>
                  {attr.name}:
                </SizeTitle>
                <SizeOptionsContainer
                  cartPage={!!this.props.cartPage}
                  lastElement={idx === this.props.attributes.length - 1}
                >
                  {attr.items.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <SizeOptionInput
                        type="radio"
                        checked={attr.selected?.value === item.value}
                        id={
                          "cart-" +
                          this.props.id +
                          "-" +
                          attr.name.toLowerCase().replaceAll(" ", "-") +
                          "-" +
                          idx
                        }
                        name={
                          "cart-" +
                          this.props.id +
                          "-" +
                          attr.name.toLowerCase().replaceAll(" ", "-")
                        }
                        value={item.value}
                        swatch={attr.type === "swatch" ? item : undefined}
                        onChange={() =>
                          this.props.setSelectedAttribiute(
                            this.props.id,
                            attr.name,
                            item
                          )
                        }
                      />
                      <SizeOption
                        cartPreview={!!this.props.cartPreview}
                        cartPage={!!this.props.cartPage}
                        htmlFor={
                          "cart-" +
                          this.props.id +
                          "-" +
                          attr.name.toLowerCase().replaceAll(" ", "-") +
                          "-" +
                          idx
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
        <ProductInfoRightContainer cartPage={!!this.props.cartPage}>
          <QuantityContainer cartPage={!!this.props.cartPage}>
            <QuantityButton
              cartPage={!!this.props.cartPage}
              onClick={(e) => {
                e.preventDefault();
                this.props.increaseCartQuantity(this.props.id);
              }}
            >
              +
            </QuantityButton>
            <QuantityNumber cartPage={!!this.props.cartPage}>
              {this.props.quantity}
            </QuantityNumber>
            <QuantityButton
              cartPage={!!this.props.cartPage}
              onClick={(e) => {
                e.preventDefault();
                this.props.decreaseCartQuantity(this.props.id);
              }}
            >
              &#8212;
            </QuantityButton>
          </QuantityContainer>
          <ProductImagePreview
            cartPage={!!this.props.cartPage}
            src={this.props.gallery[0]}
          />
        </ProductInfoRightContainer>
      </ProductInfoContainer>
    );
  }
}

export default ProductInfo;
