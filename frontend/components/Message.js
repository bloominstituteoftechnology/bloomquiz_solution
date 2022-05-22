import React from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'

const opacity = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const getColor = code => {
  switch (code) {
    case 0: return '#3a3a7b' // blue
    case 1: return '#226a22' // green
    case 2: return '#ff5959' // red
  }
}

const StyledMessage = styled.div`
  background-color: ${pr => getColor(pr.code)};
  animation: ${opacity} 1s forwards;
`

export function Message(props) {
  const { main, code, time } = props.infoMessage
  return (
    <StyledMessage key={time} code={code} id="message">
      <h1>QuizMaster</h1> {main}
    </StyledMessage>
  )
}

export default connect(st => st)(Message)
