import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 80px;
  /* background-color: black; */
  display: flex;
  flex-direction: column;

  @media (max-width: 1102px) {
  }
`;

export const NavbarLeftContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* background-color: red; */
  gap: 1rem;
  flex: 1;
  /* max-width: 25%; */
  height: 100%;
`;

export const NavbarRightContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  flex: 1;
  position: relative;
  /* max-width: 25%; */
  /* background-color: salmon; */
`;

export const NavbarInnerContainer = styled.div`
  display: flex;
  padding: 0 101px;
  align-items: center;
  height: 80px;
`;

export const Category = styled(NavLink)`
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 1rem;
  text-transform: uppercase;
  font-family: "Raleway", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 120%;
  color: black;
  height: 100%;

  &.active {
    color: #5ece7b;
    font-weight: 600;
    border-bottom: 2px solid #5ece7b;
  }
`;

export const Logo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex: 2;
  /* max-width: 50%; */
  /* background-color: beige; */
`;

export const Overlay = styled.div`
  z-index: 1040;
  background: rgba(57, 55, 72, 0.22);
  bottom: 0;
  position: absolute;
  width: 100%;
  height: calc(100% - 80px);
`;
