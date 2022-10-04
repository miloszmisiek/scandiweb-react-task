import React, { Component } from "react";
import Dropdown from "./dropdownMenu";
import { Currency, CurrencyChoice } from "./style";
import chevronDown from "../../assets/logo/vector.svg";
import chevronUp from "../../assets/logo/chevron-up.svg";
import { getCurrencies } from "../../queries/queries";
import { withRouter } from "react-router";

export class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      currencyDisplay: "",
      currencies: {},
    };
    this.stateHandler = this.stateHandler.bind(this);
  }

  componentDidMount() {
    this.props.accessClient
      .query({
        query: getCurrencies,
      })
      .then((result) =>
        this.setState(
          (prev) => ({
            ...prev,
            currencies: result.data.currencies,
            currencyDisplay: result.data.currencies[0].symbol,
          }),
          () => this.props.setCurrency(this.state.currencyDisplay)
        )
      );
  }

  stateHandler(event) {
    if (event.target.id !== "toggle") {
      this.setState({
        isExpanded: false,
      });
    }
  }

  handleClick() {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  }

  handleCurrencyClick = (e) => {
    this.setState(
      (prev) => ({
        ...prev,
        currencyDisplay: e.target.dataset.symbol,
      }),
      () => this.props.setCurrency(this.state.currencyDisplay)
    );
  };

  render() {
    return (
      <Currency id="toggle" onClick={(e) => this.handleClick(e)}>
        {this.props.children}
        {this.state.currencyDisplay}
        <img
          src={this.state.isExpanded ? chevronUp : chevronDown}
          alt="Chevron down icon"
        />
        {this.state.isExpanded && (
          <Dropdown id="currency-dropdown" stateHandler={this.stateHandler}>
            {this.state.currencies.map((curr) => (
              <CurrencyChoice
                key={curr.label}
                onClick={this.handleCurrencyClick}
                data-symbol={curr.symbol}
              >
                {curr.symbol} {curr.label}
              </CurrencyChoice>
            ))}
          </Dropdown>
        )}
      </Currency>
    );
  }
}

export const CurrencyConverterWithRouter = withRouter(CurrencyConverter);
