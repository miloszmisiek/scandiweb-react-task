import React, { Component } from "react";
import {
  PPIAttribiutesSet,
  PPIContainer,
  PPISizeInput,
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
      selectedItems: [],
    };
  }

  handleClick(e) {
    console.log(e.target);
    console.log(
      Array.prototype.slice.call(
        document.querySelectorAll("input[type='radio']:checked")
      )
    );
    //   const [attribiuteName, itemIdx] = e.target.id.split("-");
    //   this.setState(
    //     (prevState) => ({
    //       ...prevState,
    //       selectedItems: attribiutes.map(attr => )
    //   //     {
    //   //       ...prevState.selectedItems,
    //   //       [attribiuteName]: itemIdx,
    //   //     },
    //     }),
    //     () => console.log(this.state.selectedItems)
    //   );
  }

  render() {
    return (
      <form>
        <PPIContainer>
          <ProductTitleContainer>
            <ProductBrand>Apollo</ProductBrand>
            <ProductName>Running Short</ProductName>
          </ProductTitleContainer>

          {this.state.attribiutes.map((attr) => (
            <PPIAttribiutesSet>
              <PPISizeTitle>{attr.name}:</PPISizeTitle>
              <PPISizeOptionsContainer>
                {attr.items.map((item, idx) => (
                  <>
                    <PPISizeInput
                      type="radio"
                      id={attr.name.toLowerCase() + "-" + idx}
                      name={attr.name}
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
                      {attr.type !== "swatch" && item.displayValue}
                    </PPISizeOption>
                  </>
                ))}
              </PPISizeOptionsContainer>
            </PPIAttribiutesSet>
          ))}
        </PPIContainer>
      </form>
    );
  }
}

export default ProductPageInfo;
