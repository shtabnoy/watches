import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import ProductContext from '../../contexts/ProductContext'

const ProductRoot = props => (
  <ProductContext.Consumer>
    {({ products, updateProducts }) => (
      <Product
        product={products.find(p => p.id == props.match.params.id)}
        updateProducts={updateProducts}
        {...props}
      />
    )}
  </ProductContext.Consumer>
)

ProductRoot.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default ProductRoot
