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

export { getProducts, getCurrencies };
