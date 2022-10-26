import { Component, createContext } from "react";

export const ShoppingCartContext = createContext({
  cartItems: [],
  setCartItems: () => {},
  getItemQuantity: () => {},
  increaseCartQuantity: () => {},
  decreaseCartQuantity: () => {},
  removeFromCart: () => {},
  setSelectedAttribiute: () => {},
});

class ShoppingCartProvider extends Component {
  setCartItems = (product) => {
    this.setState((prevState) => ({
      ...prevState,
      cartItems: [...prevState.cartItems, product],
    }));
  };

  getItemQuantity = (id) => {
    return this.state.cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  setSelectedAttribiute = (id, name, selected) => {
    this.setState((prevState) => ({
      ...prevState,
      cartItems: prevState.cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              attributes: item.attributes.map((attr) =>
                attr.name === name ? { ...attr, selected: selected } : attr
              ),
            }
          : item
      ),
    }));
  };

  increaseCartQuantity = (id, att, gallery, prices, brand, name) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        cartItems:
          prevState.cartItems.find((item) => item.id === id) == null ||
          !prevState.cartItems
            .find((item) => item.id === id)
            ?.attributes.map(
              (attr) =>
                attr.selected.value ===
                att.find((sub) => sub.name === attr.name).selected.value
            )
            .reduce((curr, acc) => curr && acc)
            ? [
                ...prevState.cartItems,
                {
                  id: id,
                  quantity: 1,
                  attributes: att,
                  gallery: gallery,
                  prices: prices,
                  brand: brand,
                  name: name,
                },
              ]
            : prevState.cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
              ),
      }),
      () => console.log(this.state.cartItems)
    );
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

  state = {
    cartItems: [],
    setCartItems: this.setCartItems,
    getItemQuantity: this.getItemQuantity,
    increaseCartQuantity: this.increaseCartQuantity,
    decreaseCartQuantity: this.decreaseCartQuantity,
    removeFromCart: this.removeFromCart,
    setSelectedAttribiute: this.setSelectedAttribiute,
  };

  componentDidMount() {
    const data = sessionStorage.getItem("cart");
    this.setState((prevState) => ({
      ...prevState,
      cartItems: JSON.parse(data) !== null ? JSON.parse(data) : [],
    }));
  }

  componentDidUpdate(prevState) {
    if (this.state.cartItems !== prevState.cartItems) {
      sessionStorage.setItem("cart", JSON.stringify(this.state.cartItems));
    }
  }

  render() {
    return (
      <ShoppingCartContext.Provider value={this.state}>
        {this.props.children}
      </ShoppingCartContext.Provider>
    );
  }
}

export default ShoppingCartProvider;
