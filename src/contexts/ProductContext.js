import React from 'react'

const ProductContext = React.createContext({
  products: [],
  setProducts: () => {},
})

export default ProductContext
