import { useQuery, gql } from "@apollo/client";

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

export { getProducts };
