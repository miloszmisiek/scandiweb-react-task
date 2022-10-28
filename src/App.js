import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import { Main } from "./StyledApp";
import GlobalStates, { GlobalStatesContext } from "./contexts/GlobalStates";
import { getCategories, getProducts } from "./queries/queries";
import { Query } from "@apollo/client/react/components";
import ProductsListPage from "./pages/productsListPage";
import ProductDescriptionPage from "./pages/productDescriptionPage";
import React from "react";
import { ShoppingCartContext } from "./contexts/ShoppingCartContext";
import CartPage from "./pages/cartPage";

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
                setSelectedAttribiute,
              }) => (
                <>
                  <Navbar
                    currency={currency}
                    setCurrency={setCurrency}
                    cartItems={cartItems}
                    getItemQuantity={getItemQuantity}
                    increaseCartQuantity={increaseCartQuantity}
                    decreaseCartQuantity={decreaseCartQuantity}
                  />
                  <Main>
                    <Switch>
                      <Route
                        exact
                        path={`/cart/${currency?.code}`}
                        render={() => (
                          <CartPage
                            currency={currency}
                            cartItems={cartItems}
                            increaseCartQuantity={increaseCartQuantity}
                            decreaseCartQuantity={decreaseCartQuantity}
                            setSelectedAttribiute={setSelectedAttribiute}
                          />
                        )}
                      />
                      <Query query={getCategories}>
                        {({ data, loading, error }) => {
                          if (loading) return <p>Loading…</p>;
                          if (error) return <p>Something went wrong</p>;
                          return data.categories?.map((category, idx) => (
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
                                    setSelectedAttribiute={
                                      setSelectedAttribiute
                                    }
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
                                            currency={currency}
                                            setSelectedAttribiute={
                                              setSelectedAttribiute
                                            }
                                            increaseCartQuantity={
                                              increaseCartQuantity
                                            }
                                            cartItems={cartItems}
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