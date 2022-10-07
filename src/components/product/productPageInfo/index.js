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
    console.log(this.props);
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
        <PPIContainer>
          <ProductTitleContainer>
            <ProductBrand>Apollo</ProductBrand>
            <ProductName>Running Short</ProductName>
          </ProductTitleContainer>

          {this.state.attribiutes.map((attr, idx) => (
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
            <PPIPrice>$50.00</PPIPrice>
          </PPIPriceContainer>
          <PPIAddToCart checkout>add to cart</PPIAddToCart>
          <PPIDescription>
            Find stunning women's cocktail dresses and party dresses. Stand out
            in lace and metallic cocktail dresses and party dresses from all
            your favorite brands.
          </PPIDescription>
        </PPIContainer>
    );
  }
}

export default ProductPageInfo;
