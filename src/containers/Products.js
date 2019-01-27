import React, { Component } from 'react'
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

  render() {
    const { error, products } = this.state
    console.log(error)
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
        )}
      </>
    )
  }
}

export default Products
