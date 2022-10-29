import React, { Component } from "react";
import Dropdown from "./dropdownMenu";
import { Currency, CurrencyChoice } from "./style";
import chevronDown from "../../assets/icons/vector.svg";
import chevronUp from "../../assets/icons/chevron-up.svg";
import { withRouter } from "react-router";

export class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      currencyDisplay: "",
      currencyCode: "",
      currencies: [],
    };
    this.stateHandler = this.stateHandler.bind(this);
  }

  componentDidMount() {
    const { currency } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      currencies: currency.allCurrencies,
      currencyDisplay: currency.symbol,
      currencyCode: currency.code,
    }));
  }

  componentDidUpdate(prevProps) {
    const { currency } = this.props;
    if (currency.symbol !== prevProps.currency.symbol) {
      this.setState((prevState) => ({
        ...prevState,
        currencies: currency.allCurrencies,
        currencyDisplay: currency.symbol,
        currencyCode: currency.code,
      }));
    }
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
    const { setCurrency, location, history } = this.props;
    this.setState(
      (prevState) => ({
        ...prevState,
        currencyDisplay: e.target.dataset.symbol,
        currencyCode: e.target.dataset.label,
      }),
      () => {
        setCurrency(this.state.currencyDisplay, this.state.currencyCode);
        !!location.pathname.split("/")[1] &&
          history.push(
            `/${
              location.pathname.split("/")[1]
            }/${this.state.currencyCode.toLowerCase()}`
          );
        !!location.pathname.split("/")[3] &&
          history.push(
            `/${
              location.pathname.split("/")[1]
            }/${this.state.currencyCode.toLowerCase()}/${
              location.pathname.split("/")[3]
            }`
          );
      }
    );
  };

  render() {
    const { children } = this.props;
    return (
      <Currency id="toggle" onClick={(e) => this.handleClick(e)}>
        {children}
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
                data-label={curr.label}
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

export default withRouter(CurrencyConverter);
