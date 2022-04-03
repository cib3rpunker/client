import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'product1', price: 100.0 },
    { id: 2, name: 'product2', price: 100.0 },
  ])

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])

  function addProduct() {
    // setProducts([...products, { name: 'product3', price: 300.0 }])
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: 'product' + (prevState.length + 1),
        price: Math.random() * 1000,
      },
    ])
  }

  return (
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              {product.name}: {product.price}
            </li>
          )
        })}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default App
