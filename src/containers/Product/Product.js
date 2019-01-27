import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../../lib/api'
import ProductType from '../../types/Product'

class Product extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        product: PropTypes.object,
      }).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    product: ProductType,
  }

  state = {
    product: {},
    error: '',
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props
    const product = await api.getProduct(id)
    if (product.error) return this.setState({ error: product.error })
    this.setState({
      product: product.data.elements,
    })
  }

  render() {
    // const { product } = this.state
    const { location } = this.props
    console.log(location)
    return (
      <>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </>
    )
  }
}

export default Product
