import { Query } from "@apollo/react-components";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProductCard from "../../components/product/productCard";
import { getProducts } from "../../queries/queries";
import { CategoryName, ProductsContainer } from "./style";
import spinner from "../../assets/spinner.gif";

export class ProductsListPage extends Component {
  render() {
    const { category } = this.props;
    return (
      <div>
        <CategoryName>{category.name}</CategoryName>
        <ProductsContainer>
          <Query query={getProducts} variables={{ pathname: category.name }}>
            {({ data, loading, error }) => {
              if (loading)
                return <img src={spinner} height="45px" alt="Spinner" />;
              if (error) return <span> {"\u2715"} </span>;
              return data.category.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  {...this.props}
                />
              ));
            }}
          </Query>
        </ProductsContainer>
      </div>
    );
  }
}

export default withRouter(ProductsListPage);
