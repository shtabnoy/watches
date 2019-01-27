import PropTypes from 'prop-types'

export default PropTypes.shape({
  unit: PropTypes.string,
  unitAbbreviation: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
})
