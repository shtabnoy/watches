import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../lib/api'
import formatPrice from '../lib/formatPrice'
import styled from '@emotion/styled'
import colors from '../theme/colors'
import { ErrorBox } from '../components'

const Table = styled.table`
  border-collapse: collapse;
  td,
  th {
    border: 1px solid ${colors.alto};
    padding: 8px;
  }
  tr {
    cursor: pointer;
    &:nth-of-type(even) {
      background-color: ${colors.gallery};
    }
    &:hover {
      background-color: ${colors.alto};
    }
  }
  th {
    background-color: ${colors.pewter};
    color: white;
    text-align: left;
  }
`

class Products extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

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

  goToProduct = id => {
    const { history } = this.props
    history.push(`/products/${id}`)
  }

  render() {
    const { error, products } = this.state
    return (
      <>
        <h1 style={{ color: colors.nevada }}>DW Collection</h1>
        {error ? (
          <ErrorBox className="error" msg={error} />
        ) : (
          <Table>
            <thead>
              <tr>
                <th />
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr
                  onClick={() => this.goToProduct(product.id)}
                  key={product.id}
                >
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    {formatPrice(
                      product.price.value,
                      product.price.unitAbbreviation
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    )
  }
}

export default Products
