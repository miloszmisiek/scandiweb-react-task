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
      currency: { ...prevState.currency, symbol: symbol, code: code },
    }));
  };
  state = {
    currency: {
      symbol: "",
      code: "",
      allCurrencies: [],
    },
    setCurrency: this.setCurrency,
  };

  componentDidMount() {
    const { location } = this.props;
    client.query({ query: getCurrencies }).then((result) => {
      const newCurrency = result.data.currencies.filter(
        (curr) => curr.label === location.pathname.split("/")[2]?.toUpperCase()
      );
      this.setState((prevState) => ({
        ...prevState,
        currency: {
          allCurrencies: result?.data.currencies,
          symbol: newCurrency.length
            ? newCurrency[0].symbol
            : result.data.currencies[0].symbol,
          code: newCurrency.length
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
    const { children } = this.props;
    return (
      <GlobalStatesContext.Provider value={this.state}>
        {children}
      </GlobalStatesContext.Provider>
    );
  }
}

export default withRouter(GlobalStates);
