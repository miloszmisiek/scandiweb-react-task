import React, { Component } from "react";
import ProductGallery from "../../components/product/productGallery";
import { PDPContainer } from "./style";

export class ProductDescriptionPage extends Component {
  render() {
    return (
      <PDPContainer>
        <ProductGallery gallery={this.props.gallery} />
      </PDPContainer>
    );
  }
}

export default ProductDescriptionPage;
