import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from 'lib/api'
import ProductType from 'types/Product'
import formatPrice from 'lib/formatPrice'

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
    const { product = {} } = this.props
    // console.log(product)
    return (
      <>
        <h1>{product.key}</h1>
        <div>
          <img src="#" alt="Product image" />
          <div>{this.getValue(product, 'sku')}</div>
          <div>{this.getValue(product, 'description')}</div>
          {/* <div>
            {formatPrice(
              this.getValue(product, 'price').value,
              this.getValue(product, 'price').unitAbbreviation
            )}
          </div> */}
          <div>{this.getValue(product, 'color')}</div>
          <div>{this.getValue(product, 'size')}</div>
        </div>
      </>
    )
  }
}

export default Product
