import React, { Component, Fragment } from 'react'
import api from '../lib/api'
import formatPrice from '../lib/formatPrice'
import styled from '@emotion/styled'
import colors from '../theme/colors'

const Table = styled.table`
  border-collapse: collapse;
  td,
  th {
    border: 1px solid ${colors.alto};
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: ${colors.gallery};
  }
  th {
    background-color: ${colors.pewter};
    color: white;
    text-align: left;
  }
`

class Products extends Component {
  state = {
    products: [],
    error: '',
  }

  async componentDidMount() {
    const products = await api.getProducts()
    if (products.error)
      return this.setState({
        error: products.error,
      })
    this.setState({
      products,
      error: '',
    })
  }

  render() {
    const { error, products } = this.state
    return (
      <Fragment>
        {error && <div>{error}</div>}
        <h1 style={{ color: colors.nevada }}>DW collection</h1>
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
              <tr key={product.id}>
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
      </Fragment>
    )
  }
}

export default Products
