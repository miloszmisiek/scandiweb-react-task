import React, { Component } from "react";
import ProductGallery from "../../components/product/productGallery";
import ProductPageInfo from "../../components/product/productPageInfo";
import { PDPContainer } from "./style";

export class ProductDescriptionPage extends Component {
  render() {
    const { inStock, gallery } = this.props;
    return (
      <PDPContainer>
        <ProductGallery inStock={inStock} gallery={gallery} />
        <ProductPageInfo {...this.props} />
      </PDPContainer>
    );
  }
}

export default ProductDescriptionPage;
