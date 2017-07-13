import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import AddNews from '../../../containers/AddNewsContainer'
import ListNews from '../../../containers/ListNewsContainer'
import DefProfile from '../../../../public/profile_users.jpg'
const imageReq = require.context('../../../../server/upload', false, /\.png|\.jpeg|\.jpg$/)

class User extends React.Component {
  constructor (props) {
    super(props)
    this.state = { edit: false }
  }
  componentDidMount () {
    this.props.getNews(this.props.idUser)
  }

  previewFile () {
    let preview = document.querySelector('img')
    let file = document.querySelector('input[type=file]').files[0]
    let reader = new FileReader()
    reader.onloadend = () => {
      preview.src = reader.result
    }
    if (file) {
      var formData = new FormData()
      formData.append('photo', file)
      this.props.changeAvatar(this.props.idUser, formData)
    }
  }

  render () {
    let loginText
    return (<div className='row' >
      <div className='col-md-3 col-xs-12' >
        <Link to='/'><button className='btn btn-default' style={{ marginBottom: 10 }}>Home</button></Link>
        <div className='row' >
          <div className='col-md-10 col-md-offset-1 user-avatar' >
            <img className='user-avatar_img'
              src={this.props.avatar ? imageReq(`./${this.props.avatar}`) : DefProfile}
              alt='user-avatar' />
          </div>
        </div>
        <div className='row' >
          <input id='upload-avatar' type='file' className='btn btn-default col-md-10 col-md-offset-1 hide'
            onChange={() => { this.previewFile() }} />
          <button className='btn btn-default col-md-10 col-md-offset-1 col-xs-6 col-xs-offset-3'
            onClick={() => { document.getElementById('upload-avatar').click() }} >
            {(this.props.loadAvatar ? <div className='loader' /> : 'Upload avatar')}
          </button>
        </div>
        <div className='row' style={{ marginTop: 10 }} >
          <div className='col-md-10 col-md-offset-1 col-xs-12 text-left'>
            <div className='col-xs-2' >Login:</div>
            <div className='col-xs-10'>{this.props.login}</div>
          </div>
          { !this.props.edit ? <div className='col-md-10 col-md-offset-1 col-xs-12 text-left'
            onDoubleClick={this.props.editStatus} >
            <div className='col-xs-2' >Name:</div>
            <div className='col-xs-10'>{this.props.name}</div>
          </div>
            : <div className='col-md-10 col-md-offset-1 col-xs-12 text-left'>
              <form onSubmit={(e) => {
                e.preventDefault()
                this.props.changeUserInfo({ name: loginText.value, edit: false }, this.props.idUser)
              }}>
                <div className='col-xs-2' >Name:</div>
                <div className='col-xs-10'><input className='form-control' ref={(node) => { loginText = node }} /></div>
              </form>
            </div>
          }
        </div>
      </div>
      <div className='col-md-9 col-xs-12' >
        <div className='row' >
          <div className='col-md-4 col-md-push-8' >
            <AddNews />
          </div>
          <div className='col-md-8 col-md-pull-4' >
            <ListNews />
          </div>
        </div>
      </div>
    </div>
    )
  }
}

User.propTypes = {
  login: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  idUser: PropTypes.number,
  edit: PropTypes.bool,
  loadAvatar: PropTypes.bool,
  getNews: PropTypes.func.isRequired,
  changeAvatar: PropTypes.func.isRequired,
  editStatus: PropTypes.func.isRequired,
  changeUserInfo: PropTypes.func.isRequired
}

export default User
