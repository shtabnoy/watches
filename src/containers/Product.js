import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../lib/api'

class Product extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
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
