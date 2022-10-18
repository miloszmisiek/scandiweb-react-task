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
import CurrencyConverter from "../currencyConverter";
import CartPreview from "../cart/cartPreview";
import { Query } from "@apollo/react-components";
import { getCategories } from "../../queries/queries";

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
        <NavbarContainer>
          <NavbarInnerContainer>
            <NavbarLeftContainer>
              <Query query={getCategories}>
                {({ data, loading, error }) => {
                  if (loading) return <p>Loading…</p>;
                  if (error) return <p>Something went wrong</p>;
                  return data.categories?.map((category) => (
                    <Category
                      key={category.name}
                      to={`/${
                        category.name
                      }/${this.props.currency.code.toLowerCase()}`}
                    >
                      {category.name}
                    </Category>
                  ));
                }}
              </Query>
            </NavbarLeftContainer>
            <Logo>
              <img src={logo} alt="Logo" />
            </Logo>
            <NavbarRightContainer>
              <CurrencyConverter
                currency={this.props.currency}
                setCurrency={this.props.setCurrency}
              />
              <CartPreview
                stateHandler={this.stateHandler}
                cartItems={this.props.cartItems}
                currency={this.props.currency}
              />
            </NavbarRightContainer>
          </NavbarInnerContainer>
        </NavbarContainer>
        {this.state.overlayVisibile && <Overlay />}
      </>
    );
  }
}

export default Navbar;
