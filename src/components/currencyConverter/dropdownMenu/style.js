import styled from "styled-components";

export const DropdownMenu = styled.div`
  position: absolute;
  top: ${(props) => (props.cart ? "3rem" : "2rem")};
  left: ${(props) => (props.cart ? "auto" : "50%")};
  transform: ${(props) => (props.cart ? undefined : "translateX(-50%)")};
  right: ${(props) => (props.cart ? "-1rem" : "auto")};
  /* border: 1px solid black; */
  width: 100%;
  min-width: ${(props) => (props.cart ? "325px" : "114px")};
  height: fit-content;
  max-height: ${(props) => (props.cart ? "677px" : undefined)};
  overflow-y: auto;
  padding: ${(props) => (props.cart ? "1rem" : "1rem 0")};
  box-shadow: ${(props) =>
    props.cart ? undefined : "0px 4px 35px 0px rgba(168, 172, 176, 0.19)"};
  cursor: default;
  z-index: ${(props) => (props.cart ? "1041" : undefined)};
  background-color: #ffffff;
`;
