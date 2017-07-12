import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import ListNews from '../../../containers/ListNewsContainer'
import DefProfile from '../../../../public/profile_users.jpg'
const imageReq = require.context('../../../../server/upload', false, /\.png|\.jpeg|\.jpg$/)

class Profile extends React.Component {
  componentDidMount () {
    this.props.getNews(+this.props.params.id)
  }

  render () {
    return (<div className='row' >
      <div className='col-sm-3' >
        <div className='row' >
          <div className='col-sm-10 col-sm-offset-1 user-avatar' >
            <img className='user-avatar_img'
              src={this.props.user.avatar ? imageReq(`./${this.props.user.avatar}`) : DefProfile}
              alt='user-avatar' />
          </div>
        </div>
        <div className='row' style={{ marginTop: 10 }} >
          <div className='col-sm-10 col-sm-offset-1 text-left'>
            <div className='col-sm-2' >Name:</div>
            <div className='col-sm-10'>{this.props.user.name}</div>
          </div>
        </div>
      </div>
      <div className='col-sm-9' >
        <div className='row' >
          <div className='col-sm-8' >
            <ListNews />
          </div>
          <div className='col-sm-4' >
            <Link to='/'><button className='btn btn-default'>Home</button></Link>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  params: PropTypes.object,
  getNews: PropTypes.func
}

export default Profile
