import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import colors from '../theme/colors'

const StyledError = styled.div`
  background-color: ${colors.apricot};
  color: white;
  padding: 8px 16px;
  margin-bottom: 8px;
`

const ErrorBox = ({ children, className, style }) => (
  <StyledError className={className} style={style}>
    {children}
  </StyledError>
)

ErrorBox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default ErrorBox
