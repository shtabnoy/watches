import 'whatwg-fetch'

const baseUrl = 'https://dev-api.danielwellington.com/frontend'

const transformData = data => {
  const priceObj = data.elements.find(el => el.name === 'price')
  return {
    id: data.id,
    name: data.key,
    price: priceObj.value,
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
    .catch(error => {
      return { error: error.message || error }
    })
}

export default {
  getProducts,
  getProduct,
  getAsset,
}
