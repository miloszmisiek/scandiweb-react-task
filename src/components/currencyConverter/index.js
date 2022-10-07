import React, { Component } from "react";
import Dropdown from "./dropdownMenu";
import { Currency, CurrencyChoice } from "./style";
import chevronDown from "../../assets/logo/vector.svg";
import chevronUp from "../../assets/logo/chevron-up.svg";
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
    this.setState((prevState) => ({
      ...prevState,
      currencies: this.props.currency.allCurrencies,
      currencyDisplay: this.props.currency.symbol,
      currencyCode: this.props.currency.code,
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.currency.symbol !== prevProps.currency.symbol) {
      this.setState((prevState) => ({
        ...prevState,
        currencies: this.props.currency.allCurrencies,
        currencyDisplay: this.props.currency.symbol,
        currencyCode: this.props.currency.code,
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
    this.setState(
      (prevState) => ({
        ...prevState,
        currencyDisplay: e.target.dataset.symbol,
        currencyCode: e.target.dataset.label,
      }),
      () => {
        this.props.setCurrency(
          this.state.currencyDisplay,
          this.state.currencyCode
        );
        !!this.props.location.pathname.split("/")[1] &&
          this.props.history.push(
            `/${this.props.location.pathname.split("/")[1]}/${
              this.state.currencyCode
            }`
          );
        !!this.props.location.pathname.split("/")[3] &&
          this.props.history.push(
            `/${this.props.location.pathname.split("/")[1]}/${
              this.state.currencyCode
            }/${this.props.location.pathname.split("/")[3]}`
          );
      }
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
