import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import { Main } from "./StyledApp";
import GlobalStates, { GlobalStatesContext } from "./contexts/GlobalStates";
import { getCategories } from "./queries/queries";
import { Query } from "@apollo/client/react/components";
import ProductsListPage from "./pages/productsListPage";

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
                            <ProductsListPage
                              category={category}
                              currency={currency}
                            />
                          )}
                        </GlobalStatesContext.Consumer>
                      )}
                    />
                  ));
                }}
              </Query>
            </Switch>
          </Main>
        </GlobalStates>
      </div>
    </div>
  );
}

export default App;
