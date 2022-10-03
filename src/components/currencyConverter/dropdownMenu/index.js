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
    if (
      this.myRef &&
      !this.myRef.current.contains(event.target) &&
      event.target.id !== "toggle"
    ) {
      this.props.stateHandler();
    }
  }
  render() {
    return <DropdownMenu ref={this.myRef}>{this.props.children}</DropdownMenu>;
  }
}

export default Dropdown;
