import styled from "styled-components";
import {
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
  width: 100%;
`;

export const ProductBrand = styled.h5`
  margin: 0;
  font-size: 1.88rem;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ProductName = styled(ProductBrand)`
  font-weight: 400;
`;

export const ProductTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.7rem;
`;

export const PPIAttribiutesSet = styled(SizeChartContainer)`
  width: 100%;
`;

export const PPISizeTitle = styled(SizeTitle)`
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: 0em;
  text-align: center;
  text-transform: uppercase;
`;

export const PPISizeOptionsContainer = styled(SizeOptionsContainer)`
  width: 100%;
`;

export const PPISizeOption = styled(SizeOption)`
  min-width: 3.94rem;
  min-height: 2.81rem;
  background-color: ${(props) => props.swatch && props.swatch.value};
  border: ${(props) =>
    props.swatch && props.swatch.displayValue === "White"
      ? "1px solid black"
      : props.swatch?.value};
`;

export const PPISizeInput = styled(SizeOptionInput)`
  &:checked + label {
    background-color: ${(props) => !props.swatch && "black"};
    color: ${(props) => !props.swatch && "white"};
    border: ${(props) => props.swatch && "1px solid rgba(94, 206, 123, 1)"};
    padding: ${(props) => props.swatch && "-3rem"};
  }
`;
