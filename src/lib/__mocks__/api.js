export const products = [
  {
    id: 69,
    name: 'Classic St Mawes 36',
    price: { value: '199', unit: '1', unitAbbreviation: 'USD' },
  },
  {
    id: 72,
    name: 'Classic Black Sheffield 36',
    price: { value: '199', unit: '1', unitAbbreviation: 'USD' },
  },
  {
    id: 99,
    name: 'Classic Petite Melrose 32',
    price: { value: '189', unit: '1', unitAbbreviation: 'USD' },
  },
]

const getProducts = () => products

export default {
  getProducts,
}
