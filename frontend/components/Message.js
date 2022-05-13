import React from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import PT from 'prop-types'

const opacity = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const StyledMessage = styled.div`
  animation: ${opacity} 1s forwards;
`

export function Message({ infoMessage }) {
  return (
    <StyledMessage key={infoMessage} id="message">
      {infoMessage}
    </StyledMessage>
  )
}

export default connect(st => st)(Message)

Message.propTypes = {
  infoMessage: PT.string,
}
