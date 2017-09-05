import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import './HomeView.scss'
import io from 'socket.io-client'
const socket = io('', { path: '/api/chat' })

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = { associated: '', message: '' }
    console.log('.....test mess1')
    socket.on('new message', mess => {
      console.log('.....test mess2')
      this.props.addMessInChat(mess)
    })
  }
  componentDidMount () {
    socket.emit('userLogin')
    socket.on('sendUserId', (userId) => {
      this.props.setUserId(userId)
    })
  }
  sendMessage (text) {
    let _text = '' + text
    let obj = JSON.stringify({ chat: 'globalChat', message: _text })
    socket.emit('newMessage', obj)
  }

  render () {
    return (
      <div>
        <div className='home-top row' >
          <div className='avatar col-md-6 text-left' >
            <div className='col-md-8 avatar-block text-center' >
              <div className='avatar-block__avatar-name col-md-12' >Name:
                { this.props.user ? ' ' + this.props.user.name : '' }
              </div>
              <div className='col-md-12' >
                <div className='avatar-block__avatar-name col-md-12' >socketID:
                  { this.props.userId ? ' ' + this.props.userId : '' }
                </div>
                <div className='col-md-12' >
                  <Link to={'/'} onClick={() => { return this.props.logout() }} >
                    <button>Logout</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6 text-right' >
            <div className='games col-md-6 col-md-offset-6 text-center' >
              <div className='games__header' >Current Game</div>
              <div className='games__list' >
                { !this.props.games ? <div className='games__list_game' >No games created</div>
                  : this.props.games.map((game) => {
                    return (<div className='games__list_game' >{game.name}</div>)
                  })}
              </div>
              <div className='games__footer' >
                <Link to={`/game`} >
                  <button className='games__button' >
                    Create game
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='home-bottom' >
          <div className='chat' >
            <div className='chat__messages-block' >
              {console.log('.....this.state', this.props)}
              <div className='chat__messages-block_messages' >
                {
                  this.props.arrChat.reverse().map((message, index) => {
                    console.log('.....message, index', message, index)
                    return (<div className='chat__message text-left' key={index}>
                      {message.time} {message.message}
                    </div>)
                  })
                }
              </div>
            </div>
            <div className='chat__input-block row'>
              <div className='col-md-12'>
                <div className='input-group'>
                  <input type='text' className='form-control' ref={mess => { this.state.message = mess }} />
                  <span className='input-group-btn'>
                    <button className='btn btn-default' type='button' onClick={() => {
                      return this.sendMessage(this.state.message.value)
                    }}>Send</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  }

HomeView.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  userId: PropTypes.string,
  setUserId: PropTypes.func,
  arrChat: PropTypes.array,
  addMessInChat: PropTypes.func
}

export default HomeView
