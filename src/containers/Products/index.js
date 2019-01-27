import React from 'react'
import Products from './Products'
import ProductContext from '../../contexts/ProductContext'

const ProductRoot = () => (
  <ProductContext.Consumer>
    {({ products, setProducts }) => (
      <Products products={products} setProducts={setProducts} />
    )}
  </ProductContext.Consumer>
)

export default ProductRoot
