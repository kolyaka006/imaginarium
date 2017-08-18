import React from 'react'
import PropTypes from 'prop-types'
import Hand from '../../../components/Hand'
import './GameView.scss'

class GameView extends React.Component {
  componentDidMount () {
    this.props.getBlockCard()
    this.props.getHand()
  }
  render () {
    let randcard = () => {
      let temp = [];
      for (let i = 0; i < 7; i++) {
        temp.push(this.props.BlockCards[(Math.random() * 10000).toFixed(0) % 398])
      }
      return temp
    }
    return (
      <div className='content row'>
        <div className='top clearfix'>
          <div className='score'>
            <div className='user-block clearfix'>
              <div className='avatar-mini'>
                <img className='avatar-mini__img' src='/favicon.ico' alt='avatar-mini' />
              </div>
              <div className='user-score'>0</div>
            </div>
            <div className='user-block clearfix'>
              <div className='avatar-mini'>
                <img className='avatar-mini__img' src='/favicon.ico' alt='avatar-mini' />
              </div>
              <div className='user-score'>0</div>
            </div>
            <div className='user-block clearfix'>
              <div className='avatar-mini'>
                <img className='avatar-mini__img' src='/favicon.ico' alt='avatar-mini' />
              </div>
              <div className='user-score'>0</div>
            </div>
            <div className='user-block clearfix'>
              <div className='avatar-mini'>
                <img className='avatar-mini__img' src='/favicon.ico' alt='avatar-mini' />
              </div>
              <div className='user-score'>0</div>
            </div>
          </div>
          <div className='word'>Test associated</div>
          <div className='cards-block'>
            <div className='cards'>
              <img className='cards__img' src='/backCard.png' alt='card' />
              <div className='cards-score'>{this.props.BlockCards.length}</div>
            </div>
          </div>
        </div>
        <div className='middle row'>
          <div className='desk'>
            {this.props.desk.map((item, index) => {
              return (<div className='desk-card' key={index}>
                <img className='desk-card__img' src={item} alt='card' />
              </div>)
            })}
          </div>
        </div>
        <div className='bottom'>
          <Hand arrHand={this.props.hand || []}></Hand>
        </div>
      </div>
    )
  }
}

GameView.propTypes = {
  getBlockCard: PropTypes.func,
  getHand: PropTypes.func,
  BlockCards: PropTypes.array,
  hand: PropTypes.array,
  desk: PropTypes.array
}

export default GameView
