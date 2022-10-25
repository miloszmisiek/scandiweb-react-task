import React, { Component } from "react";
import ProductInfo from "../../components/product/productInfo";
import { CartHeading, CartItemsContainer, CartPageDivider } from "./style";

export class CartPage extends Component {
  render() {
    return (
      <div>
        <CartHeading>Cart</CartHeading>
        <CartItemsContainer>
          {this.props.cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <CartPageDivider />
              <ProductInfo cartPage {...item} {...this.props} />
            </React.Fragment>
          ))}
          <CartPageDivider />
        </CartItemsContainer>
      </div>
    );
  }
}

export default CartPage;
