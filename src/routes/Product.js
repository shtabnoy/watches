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
    watch: {},
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
      watch: product.data.elements,
    })
  }

  render() {
    const { watch } = this.state
    console.log(watch)
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
