import styled from "styled-components";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 80px;
  /* background-color: black; */
  display: flex;
  flex-direction: column;
`;

export const NavbarLeftContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* background-color: red; */
`;

export const NavbarRightContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  /* background-color: salmon; */
`;

export const NavbarInnerContainer = styled.div`
  display: flex;
  padding: 0 3rem;
  align-items: center;
  height: 80px;
`;

export const Category = styled.h2`
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 1rem;
  text-transform: uppercase;
  font-family: "Raleway", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 120%;
  color: #5ece7b;
`;

export const Logo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  /* background-color: beige; */
`;

export const Currency = styled.div`
  display: flex;
  margin-right: 1rem;
  font-size: 1.5rem;
  align-items: baseline;
  gap: 0.5rem;
`;

export const Basket = styled.div`
  display: flex;
  font-size: 1.5rem;
`;
