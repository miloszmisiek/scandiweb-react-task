import React, { Component } from "react";
import { Query } from "@apollo/react-components";
import { getCategories } from "../queries/queries";

export default class QueryCategories extends Component {

  render() {
    return (
      <Query query={getCategories}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Something went wrong</p>;
          return data.categories?.map((category) => this.props.children);
        }}
      </Query>
    );
  }
}
