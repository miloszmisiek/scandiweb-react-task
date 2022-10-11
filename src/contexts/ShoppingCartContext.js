import { Component, createContext } from "react";

export const ShoppingCartContext = createContext({});

class ShoppingCartProvider extends Component {
  state = {
    cartItems: [],
    setCartTiems: this.setCartTiems,
    getItemQuantity: this.getItemQuantity,
    increaseCartQuantity: this.increaseCartQuantity,
    decreaseCartQuantity: this.decreaseCartQuantity,
    removeFromCart: this.removeFromCart,
  };

  getItemQuantity = (id) => {
    return this.state.cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  increaseCartQuantity = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      cartItems:
        prevState.cartItems.find((item) => item.id === id) == null
          ? [...prevState.cartItems, { id, quantity: 1 }]
          : prevState.cartItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
    }));
  };

  decreaseCartQuantity = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      cartItems:
        prevState.cartItems.find((item) => item.id === id)?.quantity === 1
          ? prevState.cartItems.filter((item) => item.id !== id)
          : prevState.cartItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
    }));
  };

  removeFromCart = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      cartItems: prevState.cartItems.filter((item) => item.id !== id),
    }));
  };

  render() {
    return (
      <ShoppingCartContext.Provider value={this.state}>
        {this.props.children}
      </ShoppingCartContext.Provider>
    );
  }
}

export default ShoppingCartProvider;
