import React, { Component, createRef } from "react";
import { DropdownMenu } from "./style";

export class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    const { stateHandler, overlayHandler } = this.props;
    if (this.myRef && !this.myRef.current.contains(event.target)) {
      stateHandler(event);
      !!overlayHandler &&
        event.target.id !== "basketToggle" &&
        overlayHandler(event);
    }
  }
  render() {
    const { cart, children } = this.props;
    return (
      <DropdownMenu ref={this.myRef} cart={cart}>
        {children}
      </DropdownMenu>
    );
  }
}

export default Dropdown;
