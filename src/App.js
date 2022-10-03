import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import { Main } from "./StyledApp";
import GlobalStates, { GlobalStatesContext } from "./contexts/GlobalStates";

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
              <Route
                exact
                path="/clothes/"
                render={() => (
                  <GlobalStatesContext.Consumer>
                    {({ currency }) => <h1>{currency}</h1>}
                  </GlobalStatesContext.Consumer>
                )}
              />
              <Route
                exact
                path="/tech/"
                render={() => <h1>Tech</h1>}
              />
              <Route exact path="/all/" render={() => <h1>All</h1>} />
              <Route
                exact
                path="/cart/"
                render={() => <h1>Cart</h1>}
              />
            </Switch>
          </Main>
        </GlobalStates>
      </div>
    </div>
  );
}

export default App;
