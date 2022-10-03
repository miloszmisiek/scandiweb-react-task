import React, { Component } from "react";
import Dropdown from "./dropdownMenu";
import { Currency } from "./style";
import chevronDown from "../../assets/logo/vector.svg";
import chevronUp from "../../assets/logo/chevron-up.svg";

export class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.stateHandler = this.stateHandler.bind(this);
  }

  stateHandler() {
    this.setState({
      isExpanded: false,
    });
  }

  handleClick() {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  }

  render() {
    return (
      <>
        <Currency id="toggle" onClick={() => this.handleClick()}>
          {this.props.children}
          $
          <img
            src={this.state.isExpanded ? chevronUp : chevronDown}
            alt="Chevron down icon"
          />
          {this.state.isExpanded && (
            <Dropdown stateHandler={this.stateHandler}>
              <div>$ USD</div>
              <div>&#x20AC; EUR</div>
              <div>&#165; JPY</div>
            </Dropdown>
          )}
        </Currency>
      </>
    );
  }
}

export default CurrencyConverter;
