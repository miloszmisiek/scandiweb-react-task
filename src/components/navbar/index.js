import React, { Component } from "react";
import {
  Category,
  Logo,
  NavbarContainer,
  NavbarInnerContainer,
  NavbarLeftContainer,
  NavbarRightContainer,
  Overlay,
} from "./styles";
import logo from "../../assets/logo/logo.svg";

import { NavLink } from "react-router-dom";
import { CurrencyConverterWithRouter } from "../currencyConverter";
import { ApolloConsumer } from "@apollo/client";
import { GlobalStatesContext } from "../../contexts/GlobalStates";
import CartPreview from "../cart/cartPreview";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayVisibile: false,
    };
    this.stateHandler = this.stateHandler.bind(this);
  }

  stateHandler() {
    this.setState((prevState) => ({
      ...prevState,
      overlayVisibile: !prevState.overlayVisibile,
    }));
  }

  render() {
    return (
      <>
        {this.state.overlayVisibile && <Overlay />}
        <NavbarContainer>
          <NavbarInnerContainer>
            <NavbarLeftContainer>
              <Category to={"/clothes/"}>Clothes</Category>
              <Category to={"/tech"}>Tech</Category>
              <Category to={"/all"}>All</Category>
            </NavbarLeftContainer>
            <Logo>
              <NavLink to="/">
                <img src={logo} alt="Logo" />
              </NavLink>
            </Logo>
            <NavbarRightContainer>
              <ApolloConsumer>
                {(client) => (
                  <GlobalStatesContext.Consumer>
                    {({ setCurrency }) => (
                      <CurrencyConverterWithRouter
                        setCurrency={setCurrency}
                        accessClient={client}
                      />
                    )}
                  </GlobalStatesContext.Consumer>
                )}
              </ApolloConsumer>
              <CartPreview stateHandler={this.stateHandler} />
            </NavbarRightContainer>
          </NavbarInnerContainer>
        </NavbarContainer>
      </>
    );
  }
}

export default Navbar;
