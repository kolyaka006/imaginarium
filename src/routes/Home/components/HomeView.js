import React from 'react'
import { Link } from 'react-router'
import './HomeView.scss'

class HomeView extends React.Component {
  render () {
    return (
      <div>
        <div className='top' >
          <div className='avatar'>
            <div className='avatar__img-block'>
              <img src='' alt='avatar image' />
            </div>
            <div className='avatar__name'>Test name</div>
          </div>
          <div className='games'>
            <div>Current Game</div>
            <div className='games__list'>
              <div className='games__list_game'>game</div>
            </div>
            <button className='games__button'>
              <Link to={`/game`}>
                Create game
              </Link>
            </button>
          </div>
        </div>
        <div className='bottom'>
          <div className='chat'>
            <div className='chat__messages-block'>
              <div className='chat__message'>
                message
              </div>
            </div>
            <div className='chat__input-block'>
              <input className='chat__input' />
              <button className='chat__input_send'>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HomeView.propTypes = {
}

export default HomeView
