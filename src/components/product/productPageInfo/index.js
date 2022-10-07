import React, { Component } from "react";
import {
  PPIAttribiutesSet,
  PPIContainer,
  PPISizeOption,
  PPISizeOptionsContainer,
  PPISizeTitle,
  ProductBrand,
  ProductName,
  ProductTitleContainer,
} from "./style";

export class ProductPageInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attribiutes: [
        {
          name: "Capacity",
          type: "text",
          items: [
            {
              displayValue: "512G",
              value: "512G",
            },
            {
              displayValue: "1T",
              value: "1T",
            },
          ],
        },
        {
          name: "Color",
          type: "swatch",
          items: [
            {
              displayValue: "Green",
              value: "#44FF03",
            },
            {
              displayValue: "Cyan",
              value: "#03FFF7",
            },
            {
              displayValue: "Blue",
              value: "#030BFF",
            },
            {
              displayValue: "Black",
              value: "#000000",
            },
            {
              displayValue: "White",
              value: "#FFFFFF",
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <PPIContainer>
        <ProductTitleContainer>
          <ProductBrand>Apollo</ProductBrand>
          <ProductName>Running Short</ProductName>
        </ProductTitleContainer>

        {this.state.attribiutes.map((attr) => (
          <PPIAttribiutesSet>
            <PPISizeTitle>{attr.name}:</PPISizeTitle>
            <PPISizeOptionsContainer>
              {attr.type === "swatch"
                ? attr.items.map((item) => (
                    <PPISizeOption swatch={item} />
                  ))
                : attr.items.map((item) => (
                    <PPISizeOption>{item.displayValue}</PPISizeOption>
                  ))}
            </PPISizeOptionsContainer>
          </PPIAttribiutesSet>
        ))}
      </PPIContainer>
    );
  }
}

export default ProductPageInfo;
