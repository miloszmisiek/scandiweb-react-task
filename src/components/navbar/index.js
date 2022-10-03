import React, { Component } from "react";
import {
  Basket,
  Category,
  Logo,
  NavbarContainer,
  NavbarInnerContainer,
  NavbarLeftContainer,
  NavbarRightContainer,
} from "./styles";
import logo from "../../assets/logo/logo.svg";
import cart from "../../assets/logo/cart-logo.svg";
import { NavLink } from "react-router-dom";
import CurrencyConverter from "../currencyConverter";

export class Navbar extends Component {
  //   constructor() {
  //     this.state;
  //   }

  render() {
    return (
      <NavbarContainer>
        <NavbarInnerContainer>
          <NavbarLeftContainer>
            <Category to={"/clothes"}>Clothes</Category>
            <Category to={"/tech"}>Tech</Category>
            <Category to={"/all"}>All</Category>
          </NavbarLeftContainer>
          <Logo>
            <NavLink to="/">
              <img src={logo} alt="Logo" />
            </NavLink>
          </Logo>
          <NavbarRightContainer>
            {/* <Currency>
              $
              <img src={vector} alt="Chevron down icon" />
            </Currency> */}
            <CurrencyConverter/>
            <Basket>
              <img src={cart} alt="Cart icon" />
            </Basket>
          </NavbarRightContainer>
        </NavbarInnerContainer>
      </NavbarContainer>
    );
  }
}

export default Navbar;
