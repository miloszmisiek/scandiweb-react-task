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
import { NavLink } from "react-router-dom";

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
            <Currency>
              $
              <img src={vector} alt="Chevron down icon" />
            </Currency>
            <Basket>
              <NavLink to="/cart">
                <img src={cart} alt="Cart icon" />
              </NavLink>
            </Basket>
          </NavbarRightContainer>
        </NavbarInnerContainer>
      </NavbarContainer>
    );
  }
}

export default Navbar;
