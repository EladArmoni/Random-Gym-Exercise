import React from 'react'

const Header = ({text}) => {
  return (
      <h1 className="h1 text-light pt-4 pb-4 f-size" style={{ fontSize: "40px" }}>{text}</h1>
  )
}

export default Header
