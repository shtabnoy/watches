import PropTypes from 'prop-types'
import QuantityValue from './QuantityValue'
import HrefValue from './HrefValue'

export default PropTypes.shape({
  language: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    QuantityValue,
    HrefValue,
  ]),
})
