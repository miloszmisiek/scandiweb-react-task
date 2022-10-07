import React, { Component } from "react";
import ProductGallery from "../../components/product/productGallery";
import ProductPageInfo from "../../components/product/productPageInfo";
import { PDPContainer } from "./style";

export class ProductDescriptionPage extends Component {
  render() {
    return (
      <PDPContainer>
        <ProductGallery gallery={this.props.gallery} />
        <ProductPageInfo {...this.props} />
      </PDPContainer>
    );
  }
}

export default ProductDescriptionPage;
