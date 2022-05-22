import React from 'react'

export default function Opacity(props) {
  return (
    <div className="container" style={{ opacity: "1" }}>
      {props.children}
    </div>
  )
}
