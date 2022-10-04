import React, { Component } from "react";
import { createContext } from "react";

export const GlobalStatesContext = createContext({
  currency: "",
  setCurrency: () => {},
});
class GlobalStates extends Component {
  setCurrency = (currency) => {
    this.setState((prevState) => ({ ...prevState, currency: currency }));
  };

  setOverlayVisibile = (visible) => {
    this.setState((prevState) => ({ ...prevState, overlayVisibile: visible }));
  };

  state = {
    currency: "$",
    overlayVisibile: false,
    setCurrency: this.setCurrency,
    setOverlayVisibile: this.setOverlayVisibile,
  };

  render() {
    return (
      <GlobalStatesContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStatesContext.Provider>
    );
  }
}

export default GlobalStates;
