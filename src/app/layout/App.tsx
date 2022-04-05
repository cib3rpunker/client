import { useEffect, useState } from 'react'
import { Product } from './product'

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: 'product' + (prevState.length + 1),
        description: 'description' + (prevState.length + 1),
        price: Math.floor(Math.random() * 1000),
        pictureUrl: 'https://picsum.photos/200',
        brand: 'brand ' + (prevState.length + 1),
        // type: 'type ' + (prevState.length + 1),
        // quantityInStock: Math.floor(Math.random() * 100),
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
