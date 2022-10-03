import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import { Main } from "./StyledApp";
import GlobalStates, { GlobalStatesContext } from "./contexts/GlobalStates";
import { getCategories } from "./queries/queries";
import { Query } from "@apollo/client/react/components";
// import QueryCategories from "./components/QueryCategories";

function App() {
  return (
    <div className="App">
      {/* <DisplayProducts /> */}
      <div>
        <GlobalStates>
          <Navbar />
          <Main>
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              <Query query={getCategories}>
                {({ data, loading, error }) => {
                  if (loading) return <p>Loading…</p>;
                  if (error) return <p>Something went wrong</p>;
                  return data.categories?.map((category) => (
                    <Route
                      key={category.name}
                      exact
                      path={`/${category.name}/`}
                      render={() => (
                        <GlobalStatesContext.Consumer>
                          {({ currency }) => (
                            <h1>
                              {currency}
                              {category.name}
                            </h1>
                          )}
                        </GlobalStatesContext.Consumer>
                      )}
                    />
                  ));
                }}
              </Query>
              {/* <QueryCategories>
                <Route
                  key={this.props?.category.name}
                  exact
                  path={`/${this.props?.category.name}/`}
                  render={() => (
                    <GlobalStatesContext.Consumer>
                      {({ currency }) => (
                        <h1>
                          {currency}
                          {this.props?.category.name}
                        </h1>
                      )}
                    </GlobalStatesContext.Consumer>
                  )}
                />
              </QueryCategories> */}
            </Switch>
          </Main>
        </GlobalStates>
      </div>
    </div>
  );
}

export default App;
