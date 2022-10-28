import styled from "styled-components";

export const CategoryName = styled.h2`
  font-family: "Raleway", sans-serif;
  font-size: 2.63rem;
  font-weight: 400;
  line-height: 4.19rem;
  letter-spacing: 0px;
  text-align: left;
  text-transform: capitalize;
  margin: 0 0 5rem;
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-gap: 103px 40px;
  grid-template-columns: repeat(auto-fill, minmax(386px, 1fr));
`;
