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
  }
  componentDidMount () {
    socket.emit('userLogin')
    socket.on('sendUserId', (userId) => {
      this.props.setUserId(userId)
      socket.on('historyChat', history => {
//        console.log('.....test history', history)
        this.props.addMessInChat(JSON.parse(history))
        let chatBlock = document.querySelector('.chat__messages-block')
        chatBlock.scrollTop = chatBlock.scrollHeight
      })
      socket.on('listGames', games => {
        this.props.addGame(JSON.parse(games))
        console.log('.....games', JSON.parse(games))
      })
    })
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
                  { this.props.userId ? ' ' + this.props.user.userId : '' }
                </div>
                <div className='col-md-12' >
                  <Link to={'/'} onClick={() => { return this.props.logout() }} >
                    <button className='btn btn-primary'>Logout</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6 text-right' >
            <div className='games col-md-6 col-md-offset-6 text-center' >
              <div className='games__header' >Current Game</div>
              <div className='games__list' >
                { !this.props.games.length ? <div className='games__list_game' >No games created</div>
                    : this.props.games.map((game, index) => {
                      return (
                        <div className='games__list_game' key={index}>
                          <Link to={`/game/${game._id}`} >
                            <div className='games__name'>{game._id}</div>
                          </Link>
                          <div className='btn-join'>
                            <button className={game.users.indexOf(this.props.user.userId) === -1
                              ? 'btn btn-success'
                              : 'btn btn-danger'} onClick={() => {
                                return game.users.indexOf(this.props.user.userId) === -1
                                    ? socket.emit('joinGame', JSON.stringify({
                                      gameId: game._id,
                                      userId: this.props.user.userId
                                    }))
                                    : false
                              }}>JOIN ({game.users.length})</button>
                          </div>
                        </div>)
                    })}
              </div>
              <div className='games__footer' >
                <button className='games__button' onClick={() => {
                  return socket.emit('createGame', this.props.user.userId)
                }}>
                  Create Lobby
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='home-bottom' >
          <div className='chat' >
            <div className='chat__messages-block' >
              <div className='chat__messages-block_messages' ref={(chatBlock) => { this.chatBlock = chatBlock }} >
                {/*{ console.log('.....this.props.arrChat', this.props.arrChat) }*/}
                {
                  this.props.arrChat.map((message, index) => {
                    return (<div className='chat__message text-left' key={index}>
                      {message.name}(<b>{new Date(message.created_at).toTimeString().split(' ')[0]}</b>)<b>:</b>
                      {message.text}
                    </div>)
                  })
                }
              </div>
            </div>
            <div className='chat__input-block row'>
              <div className='col-md-offset-3 col-md-6'>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  let obj = JSON.stringify({ userId: this.props.user.userId,
                    name: this.props.user.name,
                    room: 'globalChat',
                    message: this.state.message.value })
                  socket.emit('newMessage', obj)
                  this.state.message.value = ''
                }}>
                  <div className='input-group'>
                    <input type='text' className='form-control' ref={mess => { this.state.message = mess }} />
                    <span className='input-group-btn'>
                      <button type='Submit' className='btn btn-default'>Send</button>
                    </span>
                  </div>
                </form>
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
  games: PropTypes.array,
  addMessInChat: PropTypes.func,
  addGame: PropTypes.func
}

export default HomeView
