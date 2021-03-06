import React from 'react'
import Products from './Products'
import ProductContext from '../../contexts/ProductContext'

const ProductRoot = () => (
  <ProductContext.Consumer>
    {({ products, setProducts, loaded }) => (
      <Products products={products} setProducts={setProducts} loaded={loaded} />
    )}
  </ProductContext.Consumer>
)

export default ProductRoot
