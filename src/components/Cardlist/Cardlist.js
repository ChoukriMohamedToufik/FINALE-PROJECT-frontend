// components/Cardlist/Cardlist.js
import React from 'react'
import Card from '../Card/Card'
import './Cardlist.css'

function Cardlist({productlist}) {
  return (
    <div className="products-grid">
      {productlist && productlist.map((p) => (
        <Card p={p} key={p._id}/>
      ))}
    </div>
  )
}

export default Cardlist