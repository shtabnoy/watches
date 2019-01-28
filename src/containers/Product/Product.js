import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from 'lib/api'
import ProductType from 'types/Product'
import styled from '@emotion/styled'
import colors from 'theme/colors'
import { ErrorBox } from 'components'

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

const Image = styled.img`
  width: 256px;
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
    imageError: '',
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
    if (!product) {
      const p = await api.getProduct(id)
      const a = await api.getAsset(p.imageId)
      p.imageUrl = a.uri
      updateProducts(p)
    } else if (!product.imageUrl) {
      const a = await api.getAsset(product.imageId)
      updateProducts({
        ...product,
        imageUrl: a.uri,
      })
    }
  }

  // getProduct = async id => {
  //   const res = await api.getProduct(id)
  //   if (res.error) {
  //     return this.setState({ error: res.error })
  //   }
  //   return res
  // }

  // getAsset = async product => {
  //   const asset = await api.getAsset(product.imageId)
  //   if (asset.error) {
  //     return this.setState({ imageError: asset.error })
  //   }
  //   return asset
  // }

  render() {
    const { product } = this.props
    // const { error, imageError } = this.state
    return (
      <>
        {product && (
          <>
            <h1>{product.name}</h1>
            <Image
              src={product.imageUrl}
              alt={`The image of ${product.name}`}
            />
            {/* {imageError ? <ErrorBox msg={imageError}> : <img src="#" alt={`The image of ${product.name}`} />} */}
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
