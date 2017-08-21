import React from 'react'
import PropTypes from 'prop-types'
import Hand from '../../../containers/HandContainer'
import './GameView.scss'
import io from 'socket.io-client'
const socket = io('', { path: '/api/chat' });

class GameView extends React.Component {
  constructor (props) {
    super(props)
    this.state = { associated: '' }
    socket.emit('chat mounted', (test) => {
      console.log('.....test emit', test)
    })
    socket.on('receive socket', (test) => {
      console.log('.....test on', test)
    })
  }
  componentDidMount () {
    this.props.getBlockCard()
    this.props.getHand()
  }

  setChoice () {
    this.props.step === 'hand' ? this.props.addCardOnDesk(this.state.associated.value) : false
  }

  render () {
    return (
      <div className='content row'>
        <div className='top clearfix'>
          <div className='score'>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
              return (<div className='user-block clearfix' key={index}>
                <div className={`avatar-mini avatar-color-${index + 1}`}>{}</div>
                <div className='user-score'>Test Name{index + 1}: 0</div>
              </div>)
            })}
          </div>
          <div className='word'>
            { (() => {
              return this.props.youStep ? <input className='form-control input-associated'
                ref={associated => { this.state.associated = associated }}
              /> : this.props.associated
            })()
            }
          </div>
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
          {(() => {
            return (this.props.youStep && this.props.step === 'desk'
              ? <button className='hand__btn-choice btn btn-primary'
                onClick={() => { return this.setChoice() }}>
              Потвердить выбор
            </button> : '')
          })()
          }
        </div>
        <div className='bottom'>
          <Hand arrHand={this.props.hand || []} activeCard={this.props.activeCard} />
          <div>
            {(() => {
              return (this.props.step === 'hand' ? <button className='hand__btn-choice btn btn-primary' onClick={() =>
              { return this.setChoice() }}>
                Потвердить выбор
              </button> : '')
            })()
            }
          </div>
        </div>
      </div>
    )
  }
}

GameView.propTypes = {
  getBlockCard: PropTypes.func,
  addCardOnDesk: PropTypes.func,
  getHand: PropTypes.func,
  BlockCards: PropTypes.array,
  hand: PropTypes.array,
  desk: PropTypes.array,
  step: PropTypes.string,
  associated: PropTypes.string,
  youStep: PropTypes.bool,
  activeCard: PropTypes.number,
}

export default GameView
