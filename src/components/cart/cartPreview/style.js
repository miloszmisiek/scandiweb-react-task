import styled from "styled-components";
import { DropdownMenu } from "../../currencyConverter/dropdownMenu/style";

export const CartDropdown = styled(DropdownMenu)`
  left: auto;
  transform: none;
  right: -1rem;
  top: 3rem;
`;

export const Basket = styled.button`
  position: relative;
  display: flex;
  font-size: 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
`;
