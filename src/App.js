import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import { AppContainer, Main } from "./style.js";
import GlobalStates, { GlobalStatesContext } from "./contexts/GlobalStates";
import { getCategories, getProducts } from "./queries/queries";
import { Query } from "@apollo/client/react/components";
import ProductsListPage from "./pages/productsListPage";
import ProductDescriptionPage from "./pages/productDescriptionPage";
import React from "react";
import { ShoppingCartContext } from "./contexts/ShoppingCartContext";
import CartPage from "./pages/cartPage";
import spinner from "./assets/spinner.gif";

function App() {
  return (
    <AppContainer>
      <GlobalStates>
        <GlobalStatesContext.Consumer>
          {({ currency, setCurrency }) => (
            <ShoppingCartContext.Consumer>
              {({ ...cart }) => (
                <>
                  <Navbar
                    currency={currency}
                    setCurrency={setCurrency}
                    {...cart}
                  />
                  <Main>
                    {/* Routes */}
                    <Switch>
                      <Route
                        exact
                        path={`/cart/${currency?.code}`}
                        render={() => (
                          <CartPage currency={currency} {...cart} />
                        )}
                      />
                      {/* Query for cateogries */}
                      <Query query={getCategories}>
                        {({ data, loading, error }) => {
                          if (loading)
                            return (
                              <img src={spinner} height="45px" alt="Spinner" />
                            );
                          if (error) return <span> {"\u2715"} </span>;
                          return data.categories?.map((category, idx) => (
                            <React.Fragment key={category.name}>
                              <Route
                                exact
                                path={`/${category.name}/${currency.code}`}
                                render={() => (
                                  <ProductsListPage
                                    category={category}
                                    currency={currency}
                                    {...cart}
                                  />
                                )}
                              />
                              {idx === 0 && (
                                <Route
                                  exact
                                  path="/"
                                  render={() => (
                                    <Redirect
                                      to={`/${category.name}/${currency?.code}`}
                                    />
                                  )}
                                />
                              )}
                              {/* Query for products */}
                              <Query
                                query={getProducts}
                                variables={{ pathname: category.name }}
                              >
                                {({ data, loading, error }) => {
                                  if (loading)
                                    return (
                                      <img
                                        src={spinner}
                                        height="45px"
                                        alt="Spinner"
                                      />
                                    );
                                  if (error) return <span> {"\u2715"} </span>;
                                  return data.category.products.map(
                                    (product) => (
                                      <Route
                                        key={product.id}
                                        exact
                                        path={`/${category.name}/${currency.code}/${product.id}`}
                                        render={() => (
                                          <ProductDescriptionPage
                                            currency={currency}
                                            {...product}
                                            {...cart}
                                          />
                                        )}
                                      />
                                    )
                                  );
                                }}
                              </Query>
                            </React.Fragment>
                          ));
                        }}
                      </Query>
                    </Switch>
                  </Main>
                </>
              )}
            </ShoppingCartContext.Consumer>
          )}
        </GlobalStatesContext.Consumer>
      </GlobalStates>
    </AppContainer>
  );
}

export default App;
