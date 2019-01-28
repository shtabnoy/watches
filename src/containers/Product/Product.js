import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from 'lib/api'
import ProductType from 'types/Product'
import styled from '@emotion/styled'
import colors from 'theme/colors'

const ProductWrapper = styled.div`
  margin: 8px 16px;
  background-color: ${colors.pewter};
  color: white;
`

const ProductField = styled.div`
  display: flex;
  justify-content: space-between;
  &:nth-of-type(odd) {
    background-color: ${colors.nevada};
  }
  & > div {
    width: 50%;
    padding: 16px;
  }
`

class Product extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    product: ProductType,
    updateProducts: PropTypes.func.isRequired,
  }

  state = {
    error: '',
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      product,
      updateProducts,
    } = this.props

    // skip request if product is passed
    // TODO: But make a request to get an asset
    if (product) return
    const res = await api.getProduct(id)
    if (res.error) {
      return this.setState({ error: res.error })
    }
    updateProducts(res)
  }

  render() {
    const { product } = this.props
    return (
      <>
        {product && (
          <>
            <h1>{product.name}</h1>
            <img src="#" alt={`The image of ${product.name}`} />
            <ProductWrapper>
              <ProductField>
                <div className="label">SKU</div>
                <div>{product.sku}</div>
              </ProductField>
              <ProductField>
                <div className="label">Description</div>
                <div>{product.description}</div>
              </ProductField>
              <ProductField>
                <div className="label">Price</div>
                <div>{product.price}</div>
              </ProductField>
              <ProductField>
                <div className="label">Color</div>
                <div>{product.color}</div>
              </ProductField>
              <ProductField>
                <div className="label">Size</div>
                <div>{product.size}</div>
              </ProductField>
            </ProductWrapper>
          </>
        )}
      </>
    )
  }
}

export default Product
