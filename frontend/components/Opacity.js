import React from 'react'

export default function Opacity(props) {
  return (
    <div id="wrapper" style={{ opacity: "1" }}>
      {props.children}
    </div>
  )
}
