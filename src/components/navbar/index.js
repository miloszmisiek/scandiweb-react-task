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
import logo from "../../assets/icons/logo.svg";
import CurrencyConverter from "../currencyConverter";
import CartPreview from "../cart/cartPreview";
import { Query } from "@apollo/react-components";
import { getCategories } from "../../queries/queries";
import spinner from "../../assets/spinner.gif";

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
    const {
      currency,
      setCurrency,
      cartItems,
      increaseCartQuantity,
      decreaseCartQuantity,
    } = this.props;
    return (
      <>
        <NavbarContainer>
          <NavbarInnerContainer>
            <NavbarLeftContainer>
              <Query query={getCategories}>
                {({ data, loading, error }) => {
                  if (loading)
                    return <img src={spinner} height="45px" alt="Spinner" />;
                  if (error) return <span> {"\u2715"} </span>;
                  return data.categories?.map((category) => (
                    <Category
                      key={category.name}
                      to={`/${category.name}/${currency.code.toLowerCase()}`}
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
                currency={currency}
                setCurrency={setCurrency}
              />
              <CartPreview
                stateHandler={this.stateHandler}
                cartItems={cartItems}
                currency={currency}
                increaseCartQuantity={increaseCartQuantity}
                decreaseCartQuantity={decreaseCartQuantity}
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
