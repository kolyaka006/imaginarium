import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import './HomeView.scss'

class HomeView extends React.Component {
  render () {
    return (
      <div>
        <div className='home-top row' >
          <div className='avatar col-md-6 text-left' >
            <div className='col-md-4 avatar-block text-center' >
              { console.log('.....this.props.user', this.props.user) }
              <div className='avatar-block__avatar-name col-md-12' >Name:
                { this.props.user ? ' ' + this.props.user.name : '' }</div>
              <div className='col-md-12' >
                <Link to={'/'} onClick={() => { return this.props.logout() }} >
                  <button>Logout</button>
                </Link>
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
              <div className='chat__messages-block_messages' >
                {
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse().map((message) => {
                    return (<div className='chat__message text-left' >
                      {new Date().toTimeString().split(' ')[0]} message {message}
                    </div>)
                  })
                }
              </div>
            </div>
            <div className='chat__input-block row'>
              <div className='col-md-12'>
                <div className='input-group'>
                  <input type='text' className='form-control' />
                  <span className='input-group-btn'>
                    <button className='btn btn-default' type='button'>Send</button>
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
    logout: PropTypes.func
  }

  export default HomeView
