import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter, Link } from 'react-router-dom'
import Products, { ProductItem } from '../Products'
import api from 'lib/api'
import formatPrice from 'lib/formatPrice'
import { products } from 'lib/__mocks__/api'

describe('Products page', () => {
  it("should get products if there weren't any and pass them to setProducts", async () => {
    // mock api getProducts with some hardcoded products
    api.getProducts = jest.fn().mockReturnValue(products)
    const setProductsMock = jest.fn()

    const wrapper = await mount(
      <MemoryRouter>
        <Products products={[]} setProducts={setProductsMock} />
      </MemoryRouter>
    )
    expect(wrapper.find(Products).state().error).toEqual('')
    expect(api.getProducts).toBeCalledTimes(1)
    expect(setProductsMock).toBeCalledTimes(1)
    expect(setProductsMock).toBeCalledWith(products)
  })

  it('should render passed products and NOT call an api to get them once again', async () => {
    api.getProducts = jest.fn()
    const setProductsMock = jest.fn()

    const wrapper = await mount(
      <MemoryRouter>
        <Products products={products} setProducts={setProductsMock} />
      </MemoryRouter>
    )
    expect(wrapper.find(Products).state().error).toEqual('')
    expect(api.getProducts).toBeCalledTimes(0)
    expect(setProductsMock).toBeCalledTimes(0)

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
    expect(item0divs.at(0).text()).toBe(products[0].key)
    expect(item0divs.at(1).text()).toBe(
      formatPrice(
        products[0].elements[3].value.value,
        products[0].elements[3].value.unitAbbreviation
      )
    )
  })

  it('renders an error if it exists', async () => {
    // mock api getProducts with an error
    api.getProducts = jest
      .fn()
      .mockReturnValue({ error: 'Failed to fetch products' })
    const setProductsMock = jest.fn()

    const wrapper = await mount(
      <MemoryRouter>
        <Products products={[]} setProducts={setProductsMock} />
      </MemoryRouter>
    )

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
    const wrapper = await mount(
      <MemoryRouter>
        <Products products={products} setProducts={jest.fn()} />
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
