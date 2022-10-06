import React, { Component } from "react";
import { createContext } from "react";

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

  // componentDidMount(){
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     currency: { symbol: symbol, code: code }
  //   }))
  // }

  setOverlayVisibile = (visible) => {
    this.setState((prevState) => ({ ...prevState, overlayVisibile: visible }));
  };

  state = {
    currency: {
      symbol: "$",
      code: "USD",
    },
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
