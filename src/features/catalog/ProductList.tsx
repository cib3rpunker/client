import { List } from "@mui/material"
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  // addProduct: () => void;
}

export default function ProductList({products, /* addProduct */}: Props) {
  return (
    <List>
      {products.map((product) => {
        return (
          <ProductCard key={product.id} product={product}/>
        )
      })}
    </List>
  )
}
