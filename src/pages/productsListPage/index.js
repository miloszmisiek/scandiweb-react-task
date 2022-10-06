import { Query } from "@apollo/react-components";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProductCard from "../../components/product/productCard";
import { getProducts } from "../../queries/queries";
import { CategoryName, ProductsContainer } from "./style";

export class ProductsListPage extends Component {
  render() {
    return (
      <div>
        <CategoryName>{this.props.category.name}</CategoryName>
        <ProductsContainer>
          <Query
            query={getProducts}
            variables={{ pathname: this.props.category.name }}
          >
            {({ data, loading, error }) => {
              if (loading) return <p>Loading…</p>;
              if (error) return <p>Something went wrong</p>;
              return data.category.products.map((product) => (
                <ProductCard {...this.props} product={product} />
              ));
            }}
          </Query>
        </ProductsContainer>
      </div>
    );
  }
}

export default withRouter(ProductsListPage);
