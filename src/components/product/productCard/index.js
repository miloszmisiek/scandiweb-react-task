import React, { Component } from "react";
import {
  AddToCartButton,
  CartIcon,
  ImagePreview,
  OutOfStock,
  ProductCardContainer,
  ProductCardData,
  ProductCardPrice,
  ProductTitleBrand,
} from "./style";
import cart from "../../../assets/icons/add-cart-button.svg";
import { withRouter } from "react-router-dom";

export class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCartVisibile: false,
      displayCurrency: "",
    };
  }

  componentDidMount() {
    const { product, currency } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      displayCurrency: product.prices.filter(
        (price) => price.currency.symbol === currency.symbol
      )[0],
    }));
  }

  componentDidUpdate(prevProps) {
    const { product, currency } = this.props;
    if (currency.symbol !== prevProps.currency.symbol) {
      this.setState((prevState) => ({
        ...prevState,
        displayCurrency: product.prices.filter(
          (price) => price.currency.symbol === currency.symbol
        )[0],
      }));
    }
  }

  render() {
    const { product, currency, history, increaseCartQuantity, category } = this.props;
    const { id, gallery, name, brand, inStock, attributes, prices } = product;
    return (
      <ProductCardContainer
        onMouseEnter={() =>
          this.setState((prev) => ({ ...prev, addCartVisibile: true }))
        }
        onMouseLeave={() =>
          this.setState((prev) => ({ ...prev, addCartVisibile: false }))
        }
        onClick={(e) =>
          e.target.id !== "add-cart-button" &&
          e.target.id !== "cart-icon" &&
          history.push(`/${category.name}/${currency.code.toLowerCase()}/${id}`)
        }
      >
        {!inStock && <OutOfStock>out of stock</OutOfStock>}
        <ImagePreview src={gallery[0]} />
        <ProductCardData>
          <ProductTitleBrand>
            {brand} {name}
          </ProductTitleBrand>
          <ProductCardPrice>
            <span>{this.state.displayCurrency.currency?.symbol}</span>
            {this.state.displayCurrency.amount}
          </ProductCardPrice>
        </ProductCardData>
        {this.state.addCartVisibile && inStock && (
          <AddToCartButton
            id="add-cart-button"
            onClick={() =>
              increaseCartQuantity(
                id,
                attributes.map((item) => ({
                  name: item.name,
                  value:
                    item.items[0].type === "swatch"
                      ? item.items[0].displayValue
                      : item.items[0].value,
                })),
                prices,
                attributes,
                gallery,
                brand,
                name
              )
            }
          >
            <CartIcon id="cart-icon" src={cart} />
          </AddToCartButton>
        )}
      </ProductCardContainer>
    );
  }
}

export default withRouter(ProductCard);
