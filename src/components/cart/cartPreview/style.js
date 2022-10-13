import styled from "styled-components";

export const Basket = styled.div`
  display: flex;
  font-size: 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
`;

export const CartItemsCounter = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  padding: 0.5px;
  background: #1d1f22;
  position: absolute;
  right: -12px;
  top: -6px;
  font-family: "Roboto", sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 1);
  align-content: center;
  pointer-events: none;
`;

export const CartIcon = styled.img`
  /* position: relative; */
`;

export const CartPrevTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

export const MyBag = styled.span`
  font-weight: ${(props) => (props.bag ? "700" : "500")};
  font-family: "Raleway", sans-serif;
  padding-left: ${(props) => (props.bag ? "0" : "0.5rem")};
  font-size: 1rem;
`;

export const CartPrevButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;

export const CartPrevButton = styled.button`
  border: ${(props) =>
    props.checkout ? "1px solid #5ECE7B" : "1px solid #1D1F22"};
  background-color: ${(props) => (props.checkout ? "#5ECE7B" : "#ffff")};
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.checkout ? "#ffff" : "#1D1F22")};
  font-family: "Raleway";
  font-style: normal;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 120%;
  width: 100%;
  max-width: 48%;
  cursor: pointer;
`;

export const ProductsContainer = styled.div`
  height: 100%;
  max-height: 450px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 2rem;
  overflow-y: auto;
`;
