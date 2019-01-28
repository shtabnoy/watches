import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  sku: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  assetId: PropTypes.number.isRequired,
})
