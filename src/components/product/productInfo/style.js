import styled from "styled-components";

export const ProductInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Raleway", sans-serif;
  gap: 1rem;
  /* height: 100%; */
`;

export const ProductInfoLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: baseline;
`;

export const ProductInfoRightContainer = styled(ProductInfoLeftContainer)`
  height: 100%;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const ProductTitle = styled.h5`
  margin: 0;
  font-size: 1rem;
  font-weight: 300;
  text-align: left;
`;
export const ProductType = styled(ProductTitle)`
  font-weight: 300;
  padding-top: 0.2rem;
`;
export const Price = styled.div`
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 0;
`;
export const SizeChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: baseline;
`;
export const ColorsContainer = styled(SizeChartContainer)``;

export const SizeTitle = styled.h5`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 400;
  padding-bottom: 0.5rem;
`;

export const SizeOptionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
  padding: 0 0 0.5rem;
  margin: 0;
`;

export const SizeOption = styled.label`
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  line-height: 22px;
  box-sizing: border-box;
  border: 1px solid black;
  width: fit-content;
  padding: 0.1rem;
  min-width: 2rem;
  min-height: 2rem;
  font-size: 0.88rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #ffffff;
  border: ${(props) =>
    props.swatch && props.swatch.displayValue === "White"
      ? "1px solid black"
      : props.swatch?.value};
  text-align: center;
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
  height: 100%;
  justify-content: space-between;
  font-size: 1rem;
`;

export const QuantityButton = styled.button`
  border: 1px solid black;
  background-color: #ffffff;
  cursor: pointer;
`;

export const QuantityNumber = styled.div`
  margin: auto 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductImagePreview = styled.img`
  height: 191px;
  object-fit: contain;
  width: 121px;
`;
