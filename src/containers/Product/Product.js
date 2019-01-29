import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import api from 'lib/api'
import ProductType from 'types/Product'
import styled from '@emotion/styled'
import colors from 'theme/colors'
import { ErrorBox } from 'components'

const ProductWrapper = styled.div`
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
  display: block;
  margin: 0 auto;
`

const Heading = styled.h1`
  text-align: center;
  position: relative;
`

const Back = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  color: ${colors.nevada};
  text-decoration: none;
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

    // get product and its image if it's not passed
    if (!product) {
      const p = await api.getProduct(id)
      if (p.error) {
        return this.setState({ error: `Unable to fetch product: ${p.error}` })
      }

      const a = await api.getAsset(p.imageId)
      if (a.error) {
        this.setState({
          imageError: `Unable to fetch image: ${a.error}`,
        })
      }

      p.imageUrl = a.uri
      updateProducts(p)
    }
    // get product image if it hasn't been downloaded yet
    else if (!product.imageUrl) {
      const a = await api.getAsset(product.imageId)
      if (a.error) {
        return this.setState({
          imageError: `Unable to fetch image: ${a.error}`,
        })
      }

      updateProducts({
        ...product,
        imageUrl: a.uri,
      })
    }
  }

  render() {
    const { product } = this.props
    const { error, imageError } = this.state
    return (
      <>
        <Heading>
          <Back to="/products">&larr;</Back>
          {product && product.name}
        </Heading>
        {imageError && <ErrorBox msg={imageError} />}
        {product && product.imageUrl && (
          <Image src={product.imageUrl} alt={`The image of ${product.name}`} />
        )}
        {error && <ErrorBox msg={error} />}
        {product && (
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
        )}
      </>
    )
  }
}

export default Product
