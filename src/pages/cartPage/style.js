import styled from "styled-components";
import { CartPrevButton } from "../../components/cart/cartPreview/style";

export const CartHeading = styled.h2`
  font-family: "Raleway", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  line-height: 40px;
  text-align: left;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

export const CartPageDivider = styled.hr`
  border: 1px solid #e5e5e5;
  background: #e5e5e5;
  margin: 1.5rem 0;
`;

export const CartItemsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const CartSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 279px;
  gap: 1rem;
  margin-right: auto;
  margin-top: 0.5rem;
`;

export const CartSummaryRow = styled.div`
  font-family: "Raleway", sans-serif;
  font-size: 1.5rem;
  display: flex;
  gap: 0.5rem;
`;

export const CartSummaryElements = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: ${(props) => (props.left ? "400" : "700")};
  text-align: left;
  gap: 0.5rem;
`;

export const CartSummaryElement = styled.div``;

export const OrderButton = styled(CartPrevButton)`
  width: auto;
  min-width: inherit;
  max-height: 43px;
  text-transform: uppercase;
`;
