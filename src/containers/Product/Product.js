import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from 'lib/api'
import ProductType from 'types/Product'
import formatPrice from 'lib/formatPrice'
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
    if (product && product.id) return
    const res = await api.getProduct(id)
    if (res.error) {
      return this.setState({ error: res.error })
    }
    updateProducts(res)
  }

  // TODO: extract to lib cause it's duplicated both in Product and in Products
  getValue = (product, prop) => {
    if (!product.elements) return
    const propObj = product.elements.find(el => el.name === prop)
    if (propObj) return propObj.value
  }

  render() {
    const { product } = this.props
    return (
      <>
        {product && product.id && (
          <>
            <h1>{product.key}</h1>
            <img src="#" alt={`The image of ${product.key}`} />
            <ProductWrapper>
              <ProductField>
                <div className="label">SKU</div>
                <div>{this.getValue(product, 'sku')}</div>
              </ProductField>
              <ProductField>
                <div className="label">Description</div>
                <div>{this.getValue(product, 'description')}</div>
              </ProductField>
              <ProductField>
                <div className="label">Price</div>
                <div>
                  {formatPrice(
                    this.getValue(product, 'price').value,
                    this.getValue(product, 'price').unitAbbreviation
                  )}
                </div>
              </ProductField>
              <ProductField>
                <div className="label">Color</div>
                <div>{this.getValue(product, 'color')}</div>
              </ProductField>
              <ProductField>
                <div className="label">Size</div>
                <div>{this.getValue(product, 'size')}</div>
              </ProductField>
            </ProductWrapper>
          </>
        )}
      </>
    )
  }
}

export default Product
