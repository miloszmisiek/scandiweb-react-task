import React, { Component } from "react";
import {
  Basket,
  Categories,
  Category,
  Currency,
  CurrencyBasket,
  Logo,
  NavBar,
  NavbarContainer,
  NavbarInnerContainer,
  NavbarLeftContainer,
  NavbarRightContainer,
} from "./styles";
import logo from "../../assets/logo/logo.svg";
import cart from "../../assets/logo/cart-logo.svg";
import vector from "../../assets/logo/vector.svg";

export class Navbar extends Component {
  //   constructor() {
  //     this.state;
  //   }

  render() {
    return (
      <NavbarContainer>
        <NavbarInnerContainer>
          <NavbarLeftContainer>
            <Category>Clothes</Category>
            <Category>Tech</Category>
            <Category>All</Category>
          </NavbarLeftContainer>
          <Logo>
            <img src={logo} alt="Logo"/>
          </Logo>
          <NavbarRightContainer>
            <Currency>
              $
              <img src={vector} alt="Chevron down icon" />
            </Currency>
            <Basket>
              <img src={cart}alt="Cart icon"/>
            </Basket>
          </NavbarRightContainer>
        </NavbarInnerContainer>
      </NavbarContainer>
    );
  }
}

export default Navbar;
