import styled from "styled-components";

export const ProductInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  font-family: "Raleway", sans-serif;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-direction: ${(props) => (props.cartPage ? "column" : undefined)};
  /* height: 100%; */
`;

export const ProductInfoLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  align-items: baseline;
`;

export const ProductInfoRightContainer = styled(ProductInfoLeftContainer)`
  flex-direction: row;
  align-items: stretch;
  gap: ${(props) => (props.cartPage ? "1.5rem" : "0.5rem")};
`;

export const ProductTitle = styled.h5`
  font-size: ${(props) => (props.cartPage ? "1.875rem" : "1rem")};
  font-weight: ${(props) => (props.cartPage ? "600" : "300")};
  line-height: ${(props) => (props.cartPage ? "1.688rem" : undefined)};
  text-align: left;
  margin: ${(props) => (props.cartPage ? "0 0 1rem" : "0")};
`;
export const ProductType = styled(ProductTitle)`
  margin: 0;
  font-weight: 300;
  padding-top: 0.2rem;
`;
export const Price = styled.div`
  font-size: ${(props) => (props.cartPage ? "1.5rem" : "1rem")};
  font-weight: ${(props) => (props.cartPage ? "700" : "500")};
  padding: ${(props) => (props.cartPage ? "1.25rem 0" : "1rem 0")};
`;
export const SizeChartContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: baseline;
  border: none;
  margin: 0;
`;
export const ColorsContainer = styled(SizeChartContainer)``;

export const SizeTitle = styled.legend`
  margin: 0;
  font-family: ${(props) =>
    props.cartPage ? "'Roboto Condensed', sans-serif" : undefined};
  font-size: ${(props) => (props.cartPage ? "1.125rem" : "0.88rem")};
  font-weight: ${(props) => (props.cartPage ? "700" : "400")};
  padding-bottom: 0.5rem;
  text-align: left;
  text-transform: ${(props) => (props.cartPage ? "uppercase" : undefined)};
`;

export const SizeOptionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
  padding: ${(props) =>
    !props.lastElement
      ? props.cartPage
        ? "0 0 1rem"
        : "0 0 0.5rem"
      : undefined};
  margin: 0;
`;

export const SizeOption = styled.label`
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  line-height: 22px;
  box-sizing: border-box;
  border: 1px solid black;
  padding: ${(props) => (props.swatch ? "0.1rem" : "0 0.2rem")};
  width: ${(props) =>
    !!props.swatch
      ? props.cartPreview
        ? "1.25rem"
        : props.cartPage
        ? "2rem"
        : undefined
      : "fit-content"};
  height: ${(props) =>
    !!props.swatch
      ? props.cartPreview
        ? "1.25rem"
        : props.cartPage
        ? "2rem"
        : "1.5rem"
      : undefined};
  min-width: ${(props) =>
    props.cartPreview
      ? !!props.swatch
        ? undefined
        : "1.5rem"
      : props.cartPage
      ? !!props.swatch
        ? undefined
        : "63px"
      : "2rem"};
  min-height: ${(props) =>
    props.cartPreview
      ? undefined
      : props.cartPage
      ? !!props.swatch
        ? undefined
        : "45px"
      : "2rem"};
  font-size: ${(props) => (props.cartPage ? "1rem" : "0.88rem")};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  /* cursor: pointer; */
  background-color: #ffffff;
  border: ${(props) => props.swatch && props.swatch?.value};
  text-align: center;
  flex-wrap: wrap;
`;

export const SizeOptionInput = styled.input`
  display: none;
  &:checked + label {
    background-color: ${(props) => !props.swatch && "black"};
    color: ${(props) => !props.swatch && "white"};
    border: ${(props) => props.swatch && "1px solid rgba(94, 206, 123, 1)"};
    padding: ${(props) => props.swatch && "1px"};
  }

  /* &:checked + label {
    background-color: red;
  } */
`;

export const ColorTitle = styled(SizeTitle)``;
export const ColorOptionsContainer = styled(SizeOptionsContainer)``;
export const ColorOption = styled(SizeOption)`
  background-color: red;
  min-width: 1.25rem;
  min-height: 1.25rem;
`;

export const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  justify-content: space-between;
  font-size: 1rem;
  margin-left: ${(props) => (props.cartPage ? "auto" : undefined)};
`;

export const QuantityButton = styled.button`
  border: 1px solid black;
  background-color: #ffffff;
  cursor: pointer;
  margin: 0 auto;
  min-width: ${(props) => (props.cartPage ? "45px" : "1.5rem")};
  min-height: ${(props) => (props.cartPage ? "45px" : "1.5rem")};
  font-family: "Roboto", sans-serif;
  font-size: ${(props) => (props.cartPage ? "1.8rem" : "1rem")};
  font-weight: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 10px);
`;

export const QuantityNumber = styled.div`
  margin: auto 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.cartPage ? "1.5rem" : undefined)};
  font-weight: ${(props) => (props.cartPage ? "500" : undefined)};
`;

export const ProductImagePreview = styled.img`
  height: ${(props) => (props.cartPage ? "280px" : "191px")};
  object-fit: contain;
  width: ${(props) => (props.cartPage ? "200px" : "121px")};
`;
