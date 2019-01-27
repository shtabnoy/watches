import React from 'react'
import { mount } from 'enzyme'
import Product from '../Product'

describe('Product page', () => {
  it('gets and renders a product', async () => {
    const wrapper = await mount(<Product />)
  })
})
