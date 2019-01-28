import 'whatwg-fetch'
import formatPrice from './formatPrice'

const baseUrl = 'https://dev-api.danielwellington.com/frontend'

const getValue = (elements, prop) => {
  const propObj = elements.find(el => el.name === prop)
  if (propObj) return propObj.value
  return ''
}

export const transformData = product => {
  const sku = getValue(product.elements, 'sku')
  const name = getValue(product.elements, 'name')
  const description = getValue(product.elements, 'description')
  const priceObj = getValue(product.elements, 'price')
  const color = getValue(product.elements, 'color')
  const size = getValue(product.elements, 'size')
  const hrefObj = getValue(product.elements, 'main_image')
  return {
    id: product.id,
    sku,
    name,
    description,
    price: formatPrice(priceObj.value, priceObj.unitAbbreviation),
    color,
    size,
    assetId: hrefObj.id,
  }
}

const getProduct = id => {
  return window
    .fetch(`${baseUrl}/products/${id}`)
    .then(res => {
      return res.json()
    })
    .then(res => res.data)
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
        products.push(transformData(product))
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
