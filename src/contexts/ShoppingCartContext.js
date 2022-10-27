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

  increaseCartQuantity = (id, selected) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        cartItems:
          prevState.cartItems.find((item) => item.id === id) == null ||
          prevState.cartItems
            .map(
              (item) =>
                item.id === id &&
                item.variant.some((attr) =>
                  selected.find(
                    (sel) => sel.name === attr.name && sel.value !== attr.value
                  )
                )
            )
            .reduce((acc, curr) => acc && curr)
            ? [
                ...prevState.cartItems,
                {
                  id: id,
                  quantity: 1,
                  variant: selected,
                },
              ]
            : prevState.cartItems.map((item) =>
                item.id === id &&
                item.variant
                  .map((attr) =>
                    selected.find(
                      (sel) =>
                        sel.name === attr.name && sel.value === attr.value
                    )
                  )
                  .reduce((acc, curr) => acc && curr)
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
      }),
      () =>
        console.log(
          this.state.cartItems,
          this.state.cartItems.map(
            (item) =>
              item.id === id &&
              item.variant.some((attr) =>
                selected.find(
                  (sel) => sel.name === attr.name && sel.value !== attr.value
                )
              )
          )
        )
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

// console.log(
//   "found different variant",
//   item.variant.filter(
//     (attr) =>
//       selected.find(
//         (sel) =>
//           sel.name === attr.name && sel.value !== attr.value
//       ) !== undefined
//   )
// )
