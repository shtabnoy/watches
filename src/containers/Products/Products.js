import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import api from 'lib/api'
import formatPrice from 'lib/formatPrice'
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
  margin: 0 16px 8px;
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
  }

  state = {
    error: '',
  }

  async componentDidMount() {
    const { products, setProducts } = this.props
    // skip request if products were already downloaded
    if (products.length > 0) return
    const res = await api.getProducts()
    if (res.error) {
      return this.setState({
        error: res.error,
      })
    }
    setProducts(res)
  }

  getValue = (product, prop) => {
    const propObj = product.elements.find(el => el.name === prop)
    if (propObj) return propObj.value
  }

  render() {
    const { products } = this.props
    const { error } = this.state
    return (
      <>
        <h1>DW Collection</h1>
        {error ? (
          <ErrorBox className="error" msg={error} />
        ) : (
          <div className="product-list">
            {products.map(product => (
              <ProductItem to={`/products/${product.id}`} key={product.id}>
                <div>{this.getValue(product, 'name')}</div>
                <div>
                  {formatPrice(
                    this.getValue(product, 'price').value,
                    this.getValue(product, 'price').unitAbbreviation
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
