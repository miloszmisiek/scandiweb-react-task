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
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import ChevronLeft from "../../../assets/icons/chevron-left.svg";

export class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCurrency: [],
      displayImage: "",
    };
  }

  componentDidMount() {
    const { prices, currency, gallery } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      displayCurrency: prices.filter(
        (price) => price.currency.symbol === currency.symbol
      )[0],
      displayImage: gallery[0],
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

  handleImage(e, next) {
    const { gallery } = this.props;
    e.preventDefault();
    let i = gallery.indexOf(this.state.displayImage);
    if (next ? i >= 0 && i < gallery.length - 1 : i > 0 && i < gallery.length)
      this.setState({
        displayImage: gallery[next ? i + 1 : i - 1],
      });
  }

  render() {
    const priceAmount = this.state.displayCurrency?.amount;
    const {
      cartPage,
      id,
      brand,
      name,
      attributes,
      variant,
      productKey,
      cartPreview,
      increaseCartQuantity,
      decreaseCartQuantity,
      quantity,
      gallery,
    } = this.props;
    return (
      <ProductInfoContainer>
        <ProductInfoLeftContainer>
          <ProductTitle cartPage={!!cartPage}>{brand}</ProductTitle>
          <ProductType cartPage={!!cartPage}>{name}</ProductType>
          <Price cartPage={!!cartPage}>
            <span>{this.state.displayCurrency?.currency?.symbol}</span>
            {priceAmount}
          </Price>
          {attributes.map((attr, idx) => (
            <React.Fragment key={attr.name}>
              <SizeChartContainer>
                <SizeTitle cartPage={!!cartPage}>{attr.name}:</SizeTitle>
                <SizeOptionsContainer
                  cartPage={!!cartPage}
                  lastElement={idx === attributes.length - 1}
                >
                  {attr.items.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <SizeOptionInput
                        type="radio"
                        readOnly
                        checked={
                          variant?.find((v) => v.name === attr.name).value ===
                          item.value
                        }
                        id={
                          "cart-" +
                          productKey +
                          "-" +
                          attr.name.toLowerCase().replaceAll(" ", "-") +
                          "-" +
                          idx
                        }
                        name={
                          "cart-" +
                          productKey +
                          "-" +
                          attr.name.toLowerCase().replaceAll(" ", "-")
                        }
                        value={item.value}
                        swatch={attr.type === "swatch" ? item : undefined}
                      />
                      <SizeOption
                        cartPreview={!!cartPreview}
                        cartPage={!!cartPage}
                        htmlFor={
                          "cart-" +
                          productKey +
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
        <ProductInfoRightContainer cartPage={!!cartPage}>
          <QuantityContainer cartPage={!!cartPage}>
            <QuantityButton
              cartPage={!!cartPage}
              onClick={(e) => {
                e.preventDefault();
                increaseCartQuantity(id, variant);
              }}
            >
              +
            </QuantityButton>
            <QuantityNumber cartPage={!!cartPage}>{quantity}</QuantityNumber>
            <QuantityButton
              cartPage={!!cartPage}
              onClick={(e) => {
                e.preventDefault();
                decreaseCartQuantity(id, variant);
              }}
            >
              &#8212;
            </QuantityButton>
          </QuantityContainer>
          <ProductImageContainer>
            <ProductImagePreview
              cartPage={!!cartPage}
              src={this.state.displayImage}
            />
            {!!cartPage && gallery.length > 1 && (
              <>
                <ImageArrow right onClick={(e) => this.handleImage(e, true)}>
                  <img src={ChevronRight} alt="Right arrow button" />
                </ImageArrow>
                <ImageArrow
                  onClick={(e) => {
                    this.handleImage(e, false);
                  }}
                >
                  <img src={ChevronLeft} alt="Left arrow button" />
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
