import 'whatwg-fetch'
import formatPrice from './formatPrice'

const baseUrl = 'https://dev-api.danielwellington.com/frontend'

const getValue = (elements, prop) => {
  const propObj = elements.find(el => el.name === prop)
  if (propObj) return propObj.value
  return ''
}

export const transformData = data => {
  const sku = getValue(data.elements, 'sku')
  const name = getValue(data.elements, 'name')
  const description = getValue(data.elements, 'description')
  const priceObj = getValue(data.elements, 'price')
  const color = getValue(data.elements, 'color')
  const size = getValue(data.elements, 'size')
  const hrefObj = getValue(data.elements, 'main_image')
  return {
    id: data.id,
    sku,
    name,
    description,
    price: formatPrice(priceObj.value, priceObj.unitAbbreviation),
    color,
    size,
    imageId: hrefObj.id,
    imageUrl: null,
  }
}

const getProduct = id => {
  return window
    .fetch(`${baseUrl}/products/${id}`)
    .then(res => {
      return res.json()
    })
    .then(res => transformData(res.data))
    .catch(error => {
      return { error: error.message || error }
    })
}

const getProducts = () => {
  return window
    .fetch(`${baseUrl}/products`)
    .then(res => {
      return res.json()
    })
    .then(async res => {
      const products = []
      for (let p of res.data) {
        const product = await getProduct(p.id)
        products.push(product)
      }
      return products
    })
    .catch(error => {
      return { error: error.message || error }
    })
}

const getAsset = id => {
  return window
    .fetch(`${baseUrl}/assets/${id}`)
    .then(res => {
      return res.json()
    })
    .then(res => res.data)
    .catch(error => {
      return { error: error.message || error }
    })
}

export default {
  getProducts,
  getProduct,
  getAsset,
}
