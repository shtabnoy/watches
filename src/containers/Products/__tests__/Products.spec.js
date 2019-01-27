import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter, Link } from 'react-router-dom'
import Products, { ProductItem } from '../Products/Products'
import api from '../../lib/api'
import formatPrice from '../../lib/formatPrice'
import { products } from '../../lib/__mocks__/api'

describe('Products page', () => {
  it('gets and renders products', async () => {
    // mock api getProducts with some hardcoded products
    api.getProducts = jest.fn().mockReturnValue(products)

    const wrapper = await mount(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    )
    expect(wrapper.find(Products).state().products).toEqual(products)
    expect(wrapper.find(Products).state().error).toEqual('')
    wrapper.update()

    const error = wrapper.find('.error')
    const productList = wrapper.find('.product-list')
    expect(error.length).toBe(0)
    expect(productList.length).toBe(1)

    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe('DW Collection')

    const items = wrapper.find(ProductItem)
    expect(items.length).toBe(products.length)
    const item0divs = items.at(0).find('div')
    expect(item0divs.at(0).text()).toBe(products[0].name)
    expect(item0divs.at(1).text()).toBe(
      formatPrice(products[0].price.value, products[0].price.unitAbbreviation)
    )
  })

  it('renders an error if it exists', async () => {
    // mock api getProducts with an error
    api.getProducts = jest
      .fn()
      .mockReturnValue({ error: 'Failed to fetch products' })

    const wrapper = await mount(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    )
    expect(wrapper.find(Products).state().products).toEqual([])
    expect(wrapper.find(Products).state().error).toBe(
      'Failed to fetch products'
    )
    wrapper.update()

    const error = wrapper.find('.error')
    const productList = wrapper.find('.product-list')
    expect(error.length).toBe(1)
    expect(error.text()).toBe('Failed to fetch products')
    expect(productList.length).toBe(0)
  })

  it('should render product items as links to their detail pages', async () => {
    api.getProducts = jest.fn().mockReturnValue(products)
    const wrapper = await mount(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    )
    wrapper.update()
    const items = wrapper.find(ProductItem)
    items.forEach(item => {
      expect(item.type().displayName).toBe('Styled(Link)')
    })
    const links = wrapper.find(Link)
    links.forEach((link, index) => {
      expect(link.props().to).toEqual(`/products/${products[index].id}`)
    })
  })
})
