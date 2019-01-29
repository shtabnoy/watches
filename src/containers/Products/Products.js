import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import api from 'lib/api'
import styled from '@emotion/styled'
import colors from 'theme/colors'
import { ErrorBox } from 'components'
import Product from 'types/Product'

export const ProductItem = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 8px 16px;
  font-size: 20px;
  background-color: ${colors.pewter};
  color: white;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: ${colors.nevada};
  }
`

class Products extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(Product).isRequired,
    setProducts: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
  }

  state = {
    error: '',
  }

  async componentDidMount() {
    const { setProducts, loaded } = this.props
    // skip request if products were already loaded
    if (loaded) return
    const res = await api.getProducts()
    if (res.error) {
      return this.setState({
        error: res.error,
      })
    }
    setProducts(res)
  }

  render() {
    const { products } = this.props
    const { error } = this.state
    return (
      <>
        <h1>DW Collection</h1>
        {error ? (
          <ErrorBox className="error">{error}</ErrorBox>
        ) : (
          <div className="product-list">
            {products.map(product => (
              <ProductItem to={`/products/${product.id}`} key={product.id}>
                <div>{product.name}</div>
                <div>{product.price}</div>
              </ProductItem>
            ))}
          </div>
        )}
      </>
    )
  }
}

export default Products
