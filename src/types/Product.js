import PropTypes from 'prop-types'
import ProductElement from './ProductElement'

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(ProductElement).isRequired,
})
