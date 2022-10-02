import "./App.css";
// import { useQuery, gql } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import { Main } from "./StyledApp";

// function DisplayProducts() {
//   const { loading, error, data } = useQuery(GET_PRODUCTS);
//   data ? console.log(data.category.products) : console.log("nothing");

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :</p>;

//   return data.category.products.map(({ id, name, inStock, category }) => (
//     <div key={id}>
//       <h3>{name}</h3>
//       <br />
//       <b>In stock:</b>
//       <p>{inStock ? "Yes" : "No"}</p>
//       <br />
//       <b>Category:</b>
//       <p>{category}</p>
//     </div>
//   ));
// }

function App() {
  return (
    <div className="App">
      {/* <DisplayProducts /> */}
      <div>
        <Navbar />
        <Main>
          <Routes>
            <Route path="/" element={<h1>Home page</h1>} />
            <Route path="about" element={<h1>About</h1>} />
          </Routes>
        </Main>
      </div>
    </div>
  );
}

export default App;
