import { gql } from "@apollo/client";

const getProducts = gql`
  query ($pathname: String!) {
    category(input: { title: $pathname }) {
      products {
        id
        name
        inStock
        brand
        gallery
        category
        description
        attributes {
          name
          type
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

export { getProducts, getCurrencies, getCategories };
