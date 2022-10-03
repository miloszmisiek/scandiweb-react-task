import React, { Component } from "react";
import { createContext } from "react";

export const GlobalStatesContext = createContext({
  currency: "",
  setCurrency: () => {},
});
class GlobalStates extends Component {

  setCurrency = (currency) => {
    this.setState({ currency });
  };

  state = {
    currency: "$",
    setCurrency: this.setCurrency,
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
