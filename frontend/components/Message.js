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

// helpful variables
const lowCase = 'bloomquiz'
const upperCase = 'BLOOMQUIZ'
const maxIndex = lowCase.length - 1

export function Message({ infoMessage }) {
  const { main, code, time } = infoMessage
  const [state, setState] = useState(lowCase.split(''))

  const onClick = () => {
    // first click
    if (state.join('') === lowCase) {
      return setState('Bloomquiz'.split(''))
    }
    // what is the index of the current uppercase letter
    let index
    state.forEach((char, idx) => {
      if (char === upperCase[idx]) index = idx
    })
    // avoid mutating the state object
    let nextState = [...state] // copy of current state
    nextState[index] = lowCase[index] // current uppercase needs to go back to lowercase
    const nextIndex = index === maxIndex ? 0 : index + 1 // depends on whether we're at the end
    nextState[nextIndex] = upperCase[nextIndex] // set the next uppercase letter
    // set the new state
    setState(nextState)
  }

  return (
    <StyledMessage key={time} code={code} id="message" onClick={onClick}>
      <h1>
        {
          state.map((char, idx) => {
            const opacity = char === upperCase[idx] ? 1 : 0.5
            return <span style={{ opacity }} key={idx}>{char}</span>
          })
        }
      </h1>
      <span>{main}</span>
    </StyledMessage>
  )
}

export default connect(st => ({ infoMessage: st.infoMessage }))(Message)
