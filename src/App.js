import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import { Main } from "./StyledApp";
import GlobalStates, { GlobalStatesContext } from "./contexts/GlobalStates";
import { getCategories, getProducts } from "./queries/queries";
import { Query } from "@apollo/client/react/components";
import ProductsListPage from "./pages/productsListPage";
import ProductDescriptionPage from "./pages/productDescriptionPage";
import React from "react";
import { ShoppingCartContext } from "./contexts/ShoppingCartContext";

function App() {
  return (
    <div className="App">
      {/* <DisplayProducts /> */}
      <GlobalStates>
        <GlobalStatesContext.Consumer>
          {({ currency, setCurrency }) => (
            <ShoppingCartContext.Consumer>
              {({
                cartItems,
                setCartItems,
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
              }) => (
                <>
                  <Navbar
                    currency={currency}
                    setCurrency={setCurrency}
                    cartItems={cartItems}
                    getItemQuantity={getItemQuantity}
                  />
                  <Main>
                    <Switch>
                      <Route exact path="/" render={() => <h1>Home page</h1>} />
                      <Query query={getCategories}>
                        {({ data, loading, error }) => {
                          if (loading) return <p>Loading…</p>;
                          if (error) return <p>Something went wrong</p>;
                          return data.categories?.map((category) => (
                            <React.Fragment key={category.name}>
                              <Route
                                exact
                                path={`/${category.name}/${currency.code}`}
                                render={() => (
                                  <ProductsListPage
                                    category={category}
                                    currency={currency}
                                    cartItems={cartItems}
                                    setCartItems={setCartItems}
                                    getItemQuantity={getItemQuantity}
                                    increaseCartQuantity={increaseCartQuantity}
                                    decreaseCartQuantity={decreaseCartQuantity}
                                    removeFromCart={removeFromCart}
                                  />
                                )}
                              />
                              <Query
                                query={getProducts}
                                variables={{ pathname: category.name }}
                              >
                                {({ data, loading, error }) => {
                                  if (loading) return <p>Loading…</p>;
                                  if (error) return <p>Something went wrong</p>;
                                  return data.category.products.map(
                                    (product) => (
                                      <Route
                                        key={product.id}
                                        exact
                                        path={`/${category.name}/${currency.code}/${product.id}`}
                                        render={() => (
                                          <ProductDescriptionPage
                                            {...product}
                                            currency={currency.symbol}
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
    </div>
  );
}

export default App;
