import React, { Component } from "react";
import {
  ImageArrow,
  Price,
  ProductImageContainer,
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
import ChevronRight from "../../../assets/chevron-right.svg";
import ChevronLeft from "../../../assets/chevron-left.svg";

export class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCurrency: [],
      displayImage: "",
    };
  }

  componentDidMount() {
    this.setState((prevState) => ({
      ...prevState,
      displayCurrency: this.props.prices.filter(
        (price) => price.currency.symbol === this.props.currency.symbol
      )[0],
      displayImage: this.props.gallery[0],
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

  handleImage(e, next) {
    e.preventDefault();
    let i = this.props.gallery.indexOf(this.state.displayImage);

    if (
      next
        ? i >= 0 && i < this.props.gallery.length - 1
        : i > 0 && i < this.props.gallery.length
    )
      this.setState({
        displayImage: this.props.gallery[next ? i + 1 : i - 1],
      });
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
                        readOnly
                        checked={
                          this.props.variant?.find((v) => v.name === attr.name)
                            .value === item.value
                        }
                        id={
                          "cart-" +
                          this.props.productKey +
                          "-" +
                          attr.name.toLowerCase().replaceAll(" ", "-") +
                          "-" +
                          idx
                        }
                        name={
                          "cart-" +
                          this.props.productKey +
                          "-" +
                          attr.name.toLowerCase().replaceAll(" ", "-")
                        }
                        value={item.value}
                        swatch={attr.type === "swatch" ? item : undefined}
                      />
                      <SizeOption
                        cartPreview={!!this.props.cartPreview}
                        cartPage={!!this.props.cartPage}
                        htmlFor={
                          "cart-" +
                          this.props.productKey +
                          "-" +
                          attr.name.toLowerCase().replaceAll(" ", "-") +
                          "-" +
                          idx
                        }
                        swatch={attr.type === "swatch" ? item : undefined}
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
                this.props.increaseCartQuantity(
                  this.props.id,
                  this.props.variant
                );
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
                this.props.decreaseCartQuantity(
                  this.props.id,
                  this.props.variant
                );
              }}
            >
              &#8212;
            </QuantityButton>
          </QuantityContainer>
          <ProductImageContainer>
            <ProductImagePreview
              cartPage={!!this.props.cartPage}
              src={this.state.displayImage}
            />
            {!!this.props.cartPage && this.props.gallery.length > 1 && (
              <>
                <ImageArrow right onClick={(e) => this.handleImage(e, true)}>
                  <img src={ChevronRight}></img>
                </ImageArrow>
                <ImageArrow onClick={(e) => this.handleImage(e, false)}>
                  <img src={ChevronLeft}></img>
                </ImageArrow>
              </>
            )}
          </ProductImageContainer>
        </ProductInfoRightContainer>
      </ProductInfoContainer>
    );
  }
}

export default ProductInfo;
