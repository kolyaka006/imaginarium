import React from 'react'
import PropTypes from 'prop-types'
const MAX_COUNT_HAND = 6

let Hand = ({ arrHand, activeCard = NaN }) => {
  return (
    <div className='hand' >
      {arrHand.map((item, index) => {
        return (<div className={activeCard === index ? 'hand-card hand-card__active' : 'hand-card'}
          key={index} onClick={() => activeCard = index}>
          <img src={item} alt='one card' />
        </div>)
      })}
      <div>
        <button className='hand__btn-choice btn btn-primary'>
          Потвердить выбор
        </button>
      </div>
    </div>
  )
}

Hand.propTypes = {
  arrHand: PropTypes.array,
  activeCard: PropTypes.number
}

export default Hand
