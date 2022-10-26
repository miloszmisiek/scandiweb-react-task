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
      selected: [],
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

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.selected);
    // const subAttr = this.props.attributes.map((item) => ({
    //   ...item,
    //   selected:
    //     this.state.selected.find((sel) => sel.name === item.name) == null
    //       ? item.items[0]
    //       : this.state.selected.find((sel) => sel.name === item.name).value,
    // }));
    this.props.increaseCartQuantity(
      this.props.id,
      this.props.attributes.map((item) => ({
        ...item,
        selected: this.state.selected.find((sel) => sel.name === item.name)
          .value,
      })),
      this.props.gallery,
      this.props.prices,
      this.props.brand,
      this.props.name
    );
  }

  render() {
    return (
      <PPIContainer>
        <form onSubmit={(e) => this.handleSubmit(e)}>
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
                      checked={
                        !!this.state.selected.find(
                          (obj) => obj.name === attr.name
                        )
                          ? item.value ===
                            this.state.selected.find(
                              (select) =>
                                select.value.value === item.value &&
                                select.name === attr.name
                            )?.value.value
                          : idx === 0
                      }
                      id={
                        attr.name.toLowerCase().replaceAll(" ", "-") + "-" + idx
                      }
                      name={attr.name.toLowerCase().replaceAll(" ", "-")}
                      value={item.value}
                      swatch={attr.type === "swatch" ? item : undefined}
                      onChange={() =>
                        this.setState(
                          (prev) => ({
                            ...prev,
                            selected:
                              prev.selected.find(
                                (item) => item.name === attr.name
                              ) == null
                                ? [
                                    ...prev.selected,
                                    { name: attr.name, value: item },
                                  ]
                                : prev.selected.map((i) =>
                                    i.name === attr.name
                                      ? { ...i, value: item }
                                      : i
                                  ),
                          }),
                          () => console.log(this.state.selected)
                        )
                      }
                    />
                    <PPISizeOption
                      htmlFor={
                        attr.name.toLowerCase().replaceAll(" ", "-") + "-" + idx
                      }
                      swatch={attr.type === "swatch" ? item : undefined}
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
            <PPIAddToCart type="submit" inStock={this.props.inStock} checkout>
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
