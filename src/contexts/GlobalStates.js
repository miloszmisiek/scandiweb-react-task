import React, { Component } from "react";
import { createContext } from "react";
import { withRouter } from "react-router-dom";
import { client } from "..";
import { getCurrencies } from "../queries/queries";

export const GlobalStatesContext = createContext({
  currency: "",
  setCurrency: () => {},
});
class GlobalStates extends Component {
  setCurrency = (symbol, code) => {
    this.setState((prevState) => ({
      ...prevState,
      currency: { symbol: symbol, code: code },
    }));
  };
  state = {
    currency: {
      symbol: "",
      code: "",
    },
    overlayVisibile: false,
    setCurrency: this.setCurrency,
    setOverlayVisibile: this.setOverlayVisibile,
  };

  componentDidMount() {
    client.query({ query: getCurrencies }).then((result) => {
      const newCurrency = result.data.currencies.filter(
        (curr) => curr.label === this.props.location.pathname.split("/")[2]
      );
      this.setState((prevState) => ({
        ...prevState,
        currency: {
          symbol: !!newCurrency.length
            ? newCurrency[0].symbol
            : result.data.currencies[0].symbol,
          code: !!newCurrency.length
            ? newCurrency[0]?.label
            : result.data.currencies[0].label,
        },
      }));
    });
  }

  setOverlayVisibile = (visible) => {
    this.setState((prevState) => ({ ...prevState, overlayVisibile: visible }));
  };

  render() {
    return (
      <GlobalStatesContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStatesContext.Provider>
    );
  }
}

export default withRouter(GlobalStates);
