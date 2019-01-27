import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  subtype: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
})
