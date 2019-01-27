export default (price, currency) => {
  if (typeof price !== 'string' && typeof price !== 'number') return price
  return Number(price).toLocaleString('en-US', {
    style: 'currency',
    currency,
  })
}
