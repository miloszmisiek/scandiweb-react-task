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
  PPISizeOption,
  PPISizeOptionsContainer,
  PPISizeTitle,
  ProductBrand,
  ProductName,
  ProductTitleContainer,
} from "./style";
import parse from "html-react-parser";
import { ImageContainer, OutOfStock } from "../productCard/style";
import { SizeOptionInput } from "../productInfo/style";

export class ProductPageInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCurrency: "",
      selected: [],
    };
  }

  componentDidMount() {
    const { prices, currency, attributes } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      displayCurrency: prices.filter(
        (price) => price.currency.symbol === currency.symbol
      )[0],
      selected: attributes.map((item) => ({
        name: item.name,
        value:
          item.items[0].type === "swatch"
            ? item.items[0].displayValue
            : item.items[0].value,
      })),
    }));
  }

  componentDidUpdate(prevProps) {
    const { prices, currency } = this.props;
    if (currency.symbol !== prevProps.currency.symbol) {
      this.setState((prevState) => ({
        ...prevState,
        displayCurrency: prices.filter(
          (price) => price.currency.symbol === currency.symbol
        )[0],
      }));
    }
  }

  handleSubmit(e) {
    const {
      increaseCartQuantity,
      id,
      selected,
      prices,
      attributes,
      gallery,
      brand,
      name,
    } = this.props;
    e.preventDefault();
    increaseCartQuantity(
      id,
      selected,
      prices,
      attributes,
      gallery,
      brand,
      name
    );
  }

  render() {
    const { brand, name, attributes, inStock, description } = this.props;
    return (
      <PPIContainer>
        <PPIContainer as="form" onSubmit={(e) => this.handleSubmit(e)}>
          <ProductTitleContainer>
            <ProductBrand>{brand}</ProductBrand>
            <ProductName>{name}</ProductName>
          </ProductTitleContainer>

          {attributes.map((attr, idx) => (
            <PPIAttribiutesSet key={idx} mt={idx !== 0}>
              <PPISizeTitle>{attr.name}:</PPISizeTitle>
              <PPISizeOptionsContainer>
                {attr.items.map((item, idx) => (
                  <React.Fragment key={item.displayValue}>
                    <SizeOptionInput
                      type="radio"
                      checked={
                        this.state.selected.find(
                          (obj) => obj.name === attr.name
                        )
                          ? item.value ===
                            this.state.selected.find(
                              (select) =>
                                select.value === item.value &&
                                select.name === attr.name
                            )?.value
                          : idx === 0
                      }
                      id={
                        attr.name.toLowerCase().replaceAll(" ", "-") + "-" + idx
                      }
                      name={attr.name.toLowerCase().replaceAll(" ", "-")}
                      value={item.value}
                      swatch={attr.type === "swatch" ? item : undefined}
                      onChange={() =>
                        this.setState((prev) => ({
                          ...prev,
                          selected:
                            prev.selected.find(
                              (item) => item.name === attr.name
                            ) == null
                              ? [
                                ...prev.selected,
                                { name: attr.name, value: item.value },
                              ]
                              : prev.selected.map((i) =>
                                i.name === attr.name
                                  ? { ...i, value: item.value }
                                  : i
                              ),
                        }))
                      }
                    />
                    <PPISizeOption
                      htmlFor={
                        attr.name.toLowerCase().replaceAll(" ", "-") + "-" + idx
                      }
                      swatch={attr.type === "swatch" ? item : undefined}
                    >
                      {attr.type !== "swatch" ? (
                        item.value
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
            <PPIAddToCart type="submit" inStock={inStock} checkout>
              add to cart
            </PPIAddToCart>
            {!inStock && <OutOfStock />}
          </ImageContainer>
          <PPIDescription>{parse(description)}</PPIDescription>
        </PPIContainer>
      </PPIContainer>
    );
  }
}

export default ProductPageInfo;
