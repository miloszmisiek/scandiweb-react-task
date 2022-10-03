import styled from "styled-components";

export const Currency = styled.div`
  display: flex;
  margin-right: 1rem;
  font-size: 1.5rem;
  align-items: baseline;
  gap: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  position: relative;
`;

export const CurrencyChoice = styled.button`
  background: transparent;
  border: none;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: rgba(238, 238, 238, 1);
  }
`;
