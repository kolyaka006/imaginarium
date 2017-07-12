import React from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import './HomeView.scss'
import ListNews from '../../../containers/ListNewsContainer'

class HomeView extends React.Component {
  componentDidMount () {
    this.props.getNews('all')
  }
  render (isLogin = this &&   this.props ? this.props.isLogin : false) {
    return (
      <div>
        { isLogin ? '' : browserHistory.push('/login')}
        <h4>Welcome, <Link to='/user' >{this.props.name}</Link>!</h4>
        <div className='row' >
          <div className='col-sm-10 col-sm-offset-1' >
            <ListNews />
          </div>
        </div>
      </div>
    )
  }
}

HomeView.propTypes = {
  isLogin: PropTypes.bool,
  name: PropTypes.string,
  getNews: PropTypes.func,
}

export default HomeView
