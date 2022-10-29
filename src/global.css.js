import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
html {
  position: relative;
}

* {
  margin: 0;
  padding: 0;
}

html,
body,
canvas,
#root {
  min-height: 100%;
  display: flex;
  flex-flow: column;
}

ul {
  list-style-type: none;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto Condensed', 'Roboto', 'Raleway',
    'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;
