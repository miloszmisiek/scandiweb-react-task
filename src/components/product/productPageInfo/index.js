import React, { Component } from "react";
import {
  ColorBox,
  PPIAddToCart,
  PPIAttribiutesSet,
  PPIContainer,
  PPIDescription,
  PPIPrice,
  PPIPriceContainer,
  PPIPriceTitle,
  PPISizeInput,
  PPISizeOption,
  PPISizeOptionsContainer,
  PPISizeTitle,
  ProductBrand,
  ProductName,
  ProductTitleContainer,
} from "./style";
import parse from "html-react-parser";
import { ImageContainer, OutOfStock } from "../productCard/style";

export class ProductPageInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCurrency: "",
    };
  }

  componentDidMount() {
    // console.log(this.props.currency.symbol);
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

  handleClick(e) {
    console.log(e.target);
    console.log(this.props);
    console.log(
      Array.prototype.slice.call(
        document.querySelectorAll("input[type='radio']:checked")
      )
    );
  }

  render() {
    return (
      <PPIContainer>
        <form>
          <ProductTitleContainer>
            <ProductBrand>{this.props.brand}</ProductBrand>
            <ProductName>{this.props.name}</ProductName>
          </ProductTitleContainer>

          {this.props.attributes.map((attr, idx) => (
            <PPIAttribiutesSet key={idx} mt={idx !== 0}>
              <PPISizeTitle>{attr.name}:</PPISizeTitle>
              <PPISizeOptionsContainer>
                {attr.items.map((item, idx) => (
                  <React.Fragment key={item.displayValue}>
                    <PPISizeInput
                      type="radio"
                      defaultChecked={idx === 0}
                      id={attr.name.toLowerCase() + "-" + idx}
                      name={attr.name.toLowerCase()}
                      value={item.value}
                      swatch={attr.type === "swatch" ? item : undefined}
                    />
                    <PPISizeOption
                      htmlFor={attr.name.toLowerCase() + "-" + idx}
                      key={item.displayValue}
                      swatch={attr.type === "swatch" ? item : undefined}
                      onClick={(e) => this.handleClick(e)}
                      value={attr.type !== "swatch" && item.displayValue}
                    >
                      {attr.type !== "swatch" ? (
                        item.displayValue
                      ) : (
                        <ColorBox swatch={item}></ColorBox>
                      )}
                    </PPISizeOption>
                  </React.Fragment>
                ))}
              </PPISizeOptionsContainer>
            </PPIAttribiutesSet>
          ))}
          <PPIPriceContainer>
            <PPIPriceTitle>PRICE:</PPIPriceTitle>
            <PPIPrice>
              <span>{this.state.displayCurrency.currency?.symbol}</span>
              {this.state.displayCurrency.amount}
            </PPIPrice>
          </PPIPriceContainer>
          <ImageContainer>
            <PPIAddToCart inStock={this.props.inStock} checkout>
              add to cart
            </PPIAddToCart>
            {!this.props.inStock && <OutOfStock />}
          </ImageContainer>
          <PPIDescription>{parse(this.props.description)}</PPIDescription>
        </form>
      </PPIContainer>
    );
  }
}

export default ProductPageInfo;
