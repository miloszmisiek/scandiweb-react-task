import styled from "styled-components";
import { Price } from "../productInfo/style";

export const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  /* width: fit-content; */
  width: calc(386px - 2rem);
  padding: 1rem;
  gap: 2rem;
  position: relative;
  &:hover {
    box-shadow: 0px 4px 35px 0px rgba(168, 172, 176, 0.19);
  }
`;

export const ImagePreview = styled.img`
  object-fit: contain;
  height: 330px;
  max-width: 354px;
`;

export const ProductCardData = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Raleway", sans-serif;
  gap: 0.3rem;
`;

export const ProductTitleBrand = styled.h5`
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 160%;
  margin: 0;
  margin-right: auto;
`;

export const ProductCardPrice = styled(Price)`
  padding: 0;
  margin-right: auto;
`;

export const AddToCartButton = styled.button`
  border: #5ece7b;
  border-radius: 50%;
  /* width: 52px;
  height: 52px; */
  background: #5ece7b;
  position: absolute;
  bottom: 5rem;
  right: 2rem;
  padding: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 11px 0px rgba(29, 31, 34, 0.1);
`;

export const CartIcon = styled.img`
  margin: 0;
`;
