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
    if (this.myRef && !this.myRef.current.contains(event.target)) {
      this.props.stateHandler(event);
      !!this.props.overlayHandler &&
        event.target.id !== "basketToggle" &&
        this.props.overlayHandler(event);
    }
  }
  render() {
    return (
      <DropdownMenu ref={this.myRef} cart={this.props.cart}>
        {this.props.children}
      </DropdownMenu>
    );
  }
}

export default Dropdown;
