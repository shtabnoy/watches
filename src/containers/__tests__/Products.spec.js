import React from 'react'
import { mount } from 'enzyme'
import Products from '../Products'
import api from '../../lib/api'
import formatPrice from '../../lib/formatPrice'
import { products } from '../../lib/__mocks__/api'

describe('Products page', () => {
  it('gets and renders products', async () => {
    // mock api getProducts with some hardcoded products
    api.getProducts = jest.fn().mockReturnValue(products)

    const wrapper = await mount(<Products />)
    expect(wrapper.state().products).toEqual(products)
    expect(wrapper.state().error).toEqual('')
    wrapper.update()

    const error = wrapper.find('.error')
    const table = wrapper.find('table')
    expect(error.length).toBe(0)
    expect(table.length).toBe(1)

    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe('DW Collection')

    const ths = wrapper.find('thead').find('th')
    expect(ths.at(0).text()).toBe('')
    expect(ths.at(1).text()).toBe('Name')
    expect(ths.at(2).text()).toBe('Price')

    const trs = wrapper.find('tbody').find('tr')
    expect(trs.length).toBe(products.length)
    const tds = trs.at(0).find('td')
    expect(tds.at(0).text()).toBe(products[0].id.toString())
    expect(tds.at(1).text()).toBe(products[0].name)
    expect(tds.at(2).text()).toBe(
      formatPrice(products[0].price.value, products[0].price.unitAbbreviation)
    )
  })
  it('render an error if it exists', async () => {
    // mock api getProducts with an error
    api.getProducts = jest
      .fn()
      .mockReturnValue({ error: 'Failed to fetch products' })

    const wrapper = await mount(<Products />)
    expect(wrapper.state().products).toEqual([])
    expect(wrapper.state().error).toBe('Failed to fetch products')
    wrapper.update()

    const error = wrapper.find('.error')
    const table = wrapper.find('table')
    expect(error.length).toBe(1)
    expect(error.text()).toBe('Failed to fetch products')
    expect(table.length).toBe(0)
  })
})
