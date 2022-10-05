import React, { Component } from "react";
import ProductCard from "../../components/product/productCard";
import { CategoryName } from "./style";

export class ProductsListPage extends Component {
  render() {
    return (
      <div>
        <CategoryName>{this.props.category.name}</CategoryName>
        <ProductCard {...this.props} />
      </div>
    );
  }
}

export default ProductsListPage;
