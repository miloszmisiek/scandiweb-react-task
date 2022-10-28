import styled from "styled-components";
import { CartPrevButton } from "../../cart/cartPreview/style";
import {
  Price,
  SizeChartContainer,
  SizeOption,
  SizeOptionInput,
  SizeOptionsContainer,
  SizeTitle,
} from "../productInfo/style";

export const PPIContainer = styled.div`
  font-family: "Raleway", sans-serif;
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  min-width: 292px;
  height: 100%;

  @media (max-width: 860px) {
    margin: auto;
    width: 100%;
  }
`;

export const ProductTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.7rem;
  max-width: 292px;

  @media (max-width: 860px) {
    margin: inherit auto;
    width: 100%;
    max-width: 100%;
  }
`;

export const ProductBrand = styled.h3`
  margin: 0;
  font-size: 1.88rem;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;

  @media (max-width: 860px) {
    text-align: center;
  }
`;

export const ProductName = styled(ProductBrand)`
  font-weight: 400;
`;

export const PPIAttribiutesSet = styled(SizeChartContainer)`
  width: 100%;
  margin-top: ${(props) => props.mt && "2rem"};
  max-width: 292px;

  @media (max-width: 860px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const PPISizeTitle = styled(SizeTitle)`
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: 0em;
  text-transform: uppercase;

  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;

export const PPISizeOptionsContainer = styled(SizeOptionsContainer)`
  width: 100%;
  @media (max-width: 860px) {
    justify-content: center;
    gap: 1rem;
  }
`;

export const PPISizeOption = styled(SizeOption)`
  min-width: ${(props) => (props.swatch ? "2.25rem" : "3.94rem")};
  min-height: ${(props) => (props.swatch ? "2.25rem" : "2.81rem")};
  cursor: pointer;
  font-size: 1rem;
`;

export const PPISizeInput = styled(SizeOptionInput)``;

export const ColorBox = styled.div`
  outline: ${(props) =>
    props.swatch && props.swatch.displayValue === "White"
      ? "1px solid black"
      : props.swatch?.value};
  background-color: ${(props) => props.swatch && props.swatch.value};
  width: 100%;
  height: 100%;
`;

export const PPIPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.625rem;
  margin-top: 2.375rem;
`;

export const PPIPriceTitle = styled(PPISizeTitle)`
  text-align: left;
  padding: 0;
`;

export const PPIPrice = styled(Price)`
  font-family: "Raleway", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: 0em;
  text-align: left;
  padding: 0;
  min-height: 2.875rem;
  display: flex;
  align-items: center;
  @media (max-width: 860px) {
    justify-content: center;
  }
`;

export const PPIAddToCart = styled(CartPrevButton)`
  text-transform: uppercase;
  margin-top: 1.25rem;
  max-width: 292px;

  @media (max-width: 860px) {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const PPIDescription = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.625rem;
  letter-spacing: 0em;
  text-align: left;
  max-width: 292px;
  margin: 2.5rem 0 0;
  color: #1d1f22;
  max-height: 103px;
  overflow: auto;
  scrollbar-gutter: stable;
  padding: 0.5rem;
  text-align: left;

  & * {
    font-size: inherit;
    margin-bottom: 0.5rem;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5ece7b;
    border-radius: 100px;
  }

  @media (max-width: 860px) {
    margin: inherit auto;
    text-align: center;
    width: 100%;
    max-width: 100%;
  }
`;
