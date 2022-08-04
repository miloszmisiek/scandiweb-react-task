import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
query {
  category(input: {title: "all"}) {
	    products {
      id
      name
      inStock
      category
    }
  }
}
`;

function DisplayProducts() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  data ? console.log(data.category.products) : console.log('nothing');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return data.category.products.map(({ id, name, inStock, category }) => (
    <div key={id}>
      <h3>{name}</h3>
      <br />
      <b>In stock:</b>
      <p>{inStock ? "Yes" : "No"}</p>
      <br />
      <b>Category:</b>
      <p>{category}</p>
    </div>
  ));
}

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <br />
      <DisplayProducts />
    </div>
  );
}

export default App;
