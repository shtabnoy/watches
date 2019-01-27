import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import formatPrice from '../lib/formatPrice'
import styled from '@emotion/styled'
import colors from '../theme/colors'
import { ErrorBox } from '../components'

const Heading = styled.h1`
  color: ${colors.nevada};
  margin: 0;
  padding: 8px 16px;
`

export const ProductItem = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 8px 16px;
  font-size: 20px;
  background-color: ${colors.pewter};
  color: white;
  margin: 0 16px 8px;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: ${colors.nevada};
  }
`

class Products extends Component {
  static propTypes = {}

  state = {
    products: [],
    error: '',
  }

  async componentDidMount() {
    const products = await api.getProducts()
    if (products.error) {
      return this.setState({
        error: products.error,
      })
    }
    this.setState({
      products,
      error: '',
    })
  }

  render() {
    const { error, products } = this.state
    return (
      <>
        <Heading>DW Collection</Heading>
        {error ? (
          <ErrorBox className="error" msg={error} />
        ) : (
          <div className="product-list">
            {products.map(product => (
              <ProductItem to={`/products/${product.id}`} key={product.id}>
                <div>{product.name}</div>
                <div>
                  {formatPrice(
                    product.price.value,
                    product.price.unitAbbreviation
                  )}
                </div>
              </ProductItem>
            ))}
          </div>
        )}
      </>
    )
  }
}

export default Products
