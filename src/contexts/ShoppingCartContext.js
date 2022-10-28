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

  increaseCartQuantity = (
    id,
    selected,
    prices,
    attributes,
    gallery,
    brand,
    name
  ) => {
    this.setState((prevState) => ({
      ...prevState,
      cartItems:
        prevState.cartItems.find((item) => item.id === id) == null ||
        (!!selected.length &&
          !this.state.cartItems
            .filter((item) => item.id === id)
            .map(
              (item) =>
                !!item.variant.length &&
                item.variant
                  .map(
                    (attr) =>
                      !!selected.find(
                        (sel) =>
                          sel.name === attr.name && sel.value === attr.value
                      )
                  )
                  .reduce((acc, curr) => acc && curr)
            )
            .some((elem) => !!elem))
          ? [
              ...prevState.cartItems,
              {
                id: id,
                quantity: 1,
                variant: selected,
                prices: prices,
                attributes: attributes,
                gallery: gallery,
                brand: brand,
                name: name,
              },
            ]
          : prevState.cartItems.map((item) =>
              item.id === id &&
              item.variant
                .map(
                  (attr) =>
                    selected.find(
                      (sel) =>
                        sel.name === attr.name && sel.value === attr.value
                    ) !== undefined
                )
                .reduce((acc, curr) => (acc && curr), true)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
    }));
    // console.log(
    //   this.state.cartItems,
    //   this.state.cartItems
    //     .filter((item) => item.id === id)
    //     .map((item) =>
    //       item.variant
    //         .map(
    //           (attr) =>
    //             !!selected.find(
    //               (sel) => sel.name === attr.name && sel.value === attr.value
    //             )
    //         )
    //         .reduce((acc, curr) => acc && curr)
    //     )
    //     .some((elem) => !!elem)
    // );
  };

  decreaseCartQuantity = (id, selected) => {
    this.setState((prevState) => ({
      ...prevState,
      cartItems:
        this.state.cartItems
          .filter((item) => item.id === id)
          .find((item) =>
            item.variant
              .map(
                (attr) =>
                  !!selected.find(
                    (sel) => sel.name === attr.name && sel.value === attr.value
                  )
              )
              .reduce((acc, curr) => (acc && curr), true)
          )?.quantity === 1
          ? this.state.cartItems.filter(
              (item) =>
                item.id !== id ||
                (item.id === id &&
                  !item.variant
                    .map(
                      (attr) =>
                        !!selected.find(
                          (sel) =>
                            sel.name === attr.name && sel.value === attr.value
                        )
                    )
                    .reduce((acc, curr) => (acc && curr), true))
            )
          : prevState.cartItems.map((item) =>
              item.id === id &&
              item.variant
                .map(
                  (attr) =>
                    selected.find(
                      (sel) =>
                        sel.name === attr.name && sel.value === attr.value
                    ) !== undefined
                )
                .reduce((acc, curr) => (acc && curr), true)
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
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
