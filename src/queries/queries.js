import { gql } from "@apollo/client";

const getProducts = gql`
  query {
    category(input: { title: "all" }) {
      products {
        id
        name
        inStock
        category
      }
    }
  }
`;

const getCurrencies = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

const getCategories = gql`
  query {
    categories {
      name
    }
  }
`;

const getTestProduct = gql`
  query {
    product(id: "jacket-canada-goosee") {
      name
      inStock
      gallery
      description
      category
      attributes {
        name
        items {
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export { getProducts, getCurrencies, getCategories, getTestProduct };
