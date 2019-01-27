import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import colors from '../theme/colors'

const StyledError = styled.span`
  background-color: ${colors.apricot};
  color: white;
  padding: 8px 16px;
`

const ErrorBox = ({ msg }) => <StyledError>{msg}</StyledError>

ErrorBox.propTypes = {
  msg: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default ErrorBox
