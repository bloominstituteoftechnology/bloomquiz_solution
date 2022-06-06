import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'

const opacity = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const getColor = code => {
  switch (code) {
    case 'blue': return '#3a3a7b'
    case 'green': return '#70b02f'
    case 'red': return '#dc004b'
    default: return '#3a3a7b' // blue
  }
}

const StyledMessage = styled.div`
  background-color: ${pr => getColor(pr.code)};
  animation: ${opacity} 1s forwards;
`

function useHeading(headingStr) {
  console.log(headingStr.split(''))
  return [headingStr.split(''), Function.prototype]
}

export function Message({ infoMessage }) {
  const { main, code, time } = infoMessage
  const [heading, clickHandler] = useHeading('bloomquiz')
  return (
    <StyledMessage key={time} code={code} id="message" onClick={clickHandler}>
      <h1>
        {
          heading.map((char, idx) => {
            return <span style={{ opacity: 0.4 }} key={idx}>{char}</span>
          })
        }
      </h1>
      <span>{main}</span>
    </StyledMessage>
  )
}

export default connect(st => ({ infoMessage: st.infoMessage }))(Message)
