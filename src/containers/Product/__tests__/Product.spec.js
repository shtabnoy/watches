import React from 'react'
import { mount } from 'enzyme'
import api from 'lib/api'
import { MemoryRouter, Link } from 'react-router-dom'
import mockApi from 'lib/__mocks__/api'
import Product from '../Product'
import { ErrorBox } from 'components'

describe('Product page', () => {
  it("should get the product and its image if it wasn't passed", async () => {
    // mock api getProduct and getAsset
    api.getProduct = jest.fn().mockReturnValue(mockApi.products[0])
    api.getAsset = jest.fn().mockReturnValue(mockApi.asset)
    const updateProductsMock = jest.fn()
    const wrapper = await mount(
      <Product
        match={{ params: { id: '69' } }}
        updateProducts={updateProductsMock}
      />
    )
    await wrapper.update()

    expect(wrapper.state().error).toEqual('')
    expect(wrapper.state().imageError).toEqual('')
    expect(api.getProduct).toBeCalledTimes(1)
    expect(api.getAsset).toBeCalledTimes(1)
    expect(api.getAsset).toBeCalledWith(mockApi.products[0].imageId)
    expect(updateProductsMock).toBeCalledWith({
      ...mockApi.products[0],
      imageUrl: mockApi.asset.uri,
    })
  })
  it('should get the product image if it was passed without an image url', async () => {
    // mock api getProduct and getAsset
    api.getProduct = jest.fn().mockReturnValue(mockApi.products[0])
    api.getAsset = jest.fn().mockReturnValue(mockApi.asset)
    const updateProductsMock = jest.fn()
    const wrapper = await mount(
      <MemoryRouter>
        <Product
          match={{ params: { id: '69' } }}
          product={mockApi.products[0]}
          updateProducts={updateProductsMock}
        />
      </MemoryRouter>
    )

    expect(wrapper.find(Product).state().error).toEqual('')
    expect(wrapper.find(Product).state().imageError).toEqual('')
    expect(api.getProduct).toBeCalledTimes(0)
    expect(api.getAsset).toBeCalledTimes(1)
    expect(api.getAsset).toBeCalledWith(mockApi.products[0].imageId)
    expect(updateProductsMock).toBeCalledWith({
      ...mockApi.products[0],
      imageUrl: mockApi.asset.uri,
    })
  })
  it('should NOT call an api if the product with an image was passed', async () => {
    // mock api getProduct and getAsset
    api.getProduct = jest.fn().mockReturnValue(mockApi.products[0])
    api.getAsset = jest.fn().mockReturnValue(mockApi.asset)
    const updateProductsMock = jest.fn()
    const wrapper = await mount(
      <MemoryRouter>
        <Product
          match={{ params: { id: '69' } }}
          product={{
            ...mockApi.products[0],
            imageUrl: mockApi.asset.uri,
          }}
          updateProducts={updateProductsMock}
        />
      </MemoryRouter>
    )

    expect(wrapper.find(Product).state().error).toEqual('')
    expect(wrapper.find(Product).state().imageError).toEqual('')
    expect(api.getProduct).toBeCalledTimes(0)
    expect(api.getAsset).toBeCalledTimes(0)
  })
  it('should render the product when it was passed', async () => {
    // mock api getProduct and getAsset
    api.getProduct = jest.fn().mockReturnValue(mockApi.products[0])
    api.getAsset = jest.fn().mockReturnValue(mockApi.asset)
    const updateProductsMock = jest.fn()
    const wrapper = await mount(
      <MemoryRouter>
        <Product
          match={{ params: { id: '69' } }}
          product={{
            ...mockApi.products[0],
            imageUrl: mockApi.asset.uri,
          }}
          updateProducts={updateProductsMock}
        />
      </MemoryRouter>
    )

    const errors = wrapper.find(ErrorBox)
    expect(errors.length).toBe(0)
    const h1 = wrapper.find('h1')
    expect(h1.find('span').text()).toBe(mockApi.products[0].name)
    const labels = wrapper.find('.label')
    const values = wrapper.find('.value')
    expect(labels.at(0).text()).toBe('SKU')
    expect(values.at(0).text()).toBe(mockApi.products[0].sku)
    expect(labels.at(1).text()).toBe('Description')
    expect(values.at(1).text()).toBe(mockApi.products[0].description)
    expect(labels.at(2).text()).toBe('Price')
    expect(values.at(2).text()).toBe(mockApi.products[0].price)
    expect(labels.at(3).text()).toBe('Color')
    expect(values.at(3).text()).toBe(mockApi.products[0].color)
    expect(labels.at(4).text()).toBe('Size')
    expect(values.at(4).text()).toBe(mockApi.products[0].size.toString())
  })
  it('should render an error if product was loaded incorrectly', async () => {
    // mock api getProduct and getAsset
    api.getProduct = jest.fn().mockReturnValue({ error: 'Database corrupted' })
    api.getAsset = jest.fn().mockReturnValue(mockApi.asset)
    const updateProductsMock = jest.fn()
    const wrapper = await mount(
      <MemoryRouter>
        <Product
          match={{ params: { id: '69' } }}
          updateProducts={updateProductsMock}
        />
      </MemoryRouter>
    )
    wrapper.update()
    expect(wrapper.find(Product).state().error).toEqual(
      'Unable to fetch product: Database corrupted'
    )
    expect(wrapper.find(Product).state().imageError).toEqual('')

    const errors = wrapper.find(ErrorBox)
    expect(errors.length).toBe(1)
    expect(errors.at(0).text()).toBe(
      'Unable to fetch product: Database corrupted'
    )
  })
  it("should render an image error if there's a problem to get an image", async () => {
    // mock api getProduct and getAsset
    api.getProduct = jest.fn().mockReturnValue(mockApi.products[0])
    api.getAsset = jest.fn().mockReturnValue({ error: 'Broken image' })
    const updateProductsMock = jest.fn()
    const wrapper = await mount(
      <MemoryRouter>
        <Product
          match={{ params: { id: '69' } }}
          updateProducts={updateProductsMock}
        />
      </MemoryRouter>
    )
    await wrapper.update()
    expect(wrapper.find(Product).state().error).toEqual('')
    expect(wrapper.find(Product).state().imageError).toEqual(
      'Unable to fetch image: Broken image'
    )

    wrapper.update()
    const errors = wrapper.find(ErrorBox)
    expect(errors.length).toBe(1)
    expect(errors.at(0).text()).toBe('Unable to fetch image: Broken image')
  })
  it('should render Link with back arrow leading to /products', async () => {
    // mock api getProduct and getAsset
    api.getProduct = jest.fn()
    api.getAsset = jest.fn()
    const updateProductsMock = jest.fn()
    const wrapper = await mount(
      <MemoryRouter>
        <Product
          match={{ params: { id: '69' } }}
          product={{
            ...mockApi.products[0],
            imageUrl: mockApi.asset.uri,
          }}
          updateProducts={updateProductsMock}
        />
      </MemoryRouter>
    )
    wrapper.update()

    const link = wrapper.find('h1').find(Link)
    expect(link.props().to).toBe('/products')
  })
})
