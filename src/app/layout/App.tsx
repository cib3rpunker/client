import { Container, CssBaseline } from '@mui/material'
import { useEffect, useState } from 'react'
import Catalog from '../../features/catalog/Catalog'
import { Product } from '../models/product'
import Header from './Header'

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
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products} addProduct={addProduct} />
      </Container>
    </>
  )
}

export default App
