import React from 'react'
import PropTypes from 'prop-types'

let Hand = ({ arrHand, activeCard = NaN, setActiveCard, step }) => {
  let setActive = (id) => {
    step === 'hand' ? setActiveCard(id) : false
  }

  return (
    <div className='hand' >
      {arrHand.map((item, index) => {
        return (<div className={activeCard === index ? 'hand-card hand-card__active' : 'hand-card'}
          key={index} onClick={() => { return setActive(index) }}>
          <img src={item} alt='one card' />
        </div>)
      })}
    </div>
  )
}

Hand.propTypes = {
  arrHand: PropTypes.array,
  activeCard: PropTypes.number,
  step: PropTypes.string,
  setActiveCard: PropTypes.func,
}

export default Hand
