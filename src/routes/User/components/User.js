import React from 'react'
import PropTypes from 'prop-types'
import AddNews from '../../../containers/AddNewsContainer'
import ListNews from '../../../containers/ListNewsContainer'
import DefProfile from '../../../../public/profile_users.jpg'
const imageReq = require.context('../../../../server/upload', false, /\.png|\.jpeg|\.jpg$/)

class User extends React.Component {
  constructor (props) {
    super(props)
    this.state = { edit: false }
  }
  componentDidMount (getNews, idUser) {
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

  render (login = this.props.login) {
    let loginText
    return (<div className='row' >
      <div className='col-sm-3' >
        <div className='row' >
          <div className='col-sm-10 col-sm-offset-1 user-avatar' >
            <img className='user-avatar_img'
              src={this.props.avatar ? imageReq(`./${this.props.avatar}`) : DefProfile}
              alt='user-avatar' />
          </div>
        </div>
        <div className='row' >
          <input id='file-upload' type='file' className='btn btn-default col-sm-10 col-sm-offset-1 hide'
            onChange={() => { this.previewFile() }} />
          <button className='btn btn-default col-sm-10 col-sm-offset-1'
            onClick={() => { document.getElementById('file-upload').click() }} >Upload
          </button>
        </div>
        <div className='row' style={{ marginTop: 10 }} >
          <div className='col-sm-10 col-sm-offset-1 text-left'>
            <div className='col-sm-2' >Login:</div>
            <div className='col-sm-10'>{this.props.login}</div>
          </div>
          { !this.props.edit ? <div className='col-sm-10 col-sm-offset-1 text-left'
            onDoubleClick={this.props.editStatus} >
            <div className='col-sm-2' >Name:</div>
            <div className='col-sm-10'>{this.props.name}</div>
          </div>
            : <div className='col-sm-10 col-sm-offset-1 text-left'>
              <form onSubmit={(e) => {
                e.preventDefault()
                this.props.changeUserInfo({ name: loginText.value, edit: false })
              }}>
                <div className='col-sm-2' >Name:</div>
                <div className='col-sm-10'><input className='form-control' ref={(node) => { loginText = node }} /></div>
              </form>
            </div>
          }
        </div>
      </div>
      <div className='col-sm-9' >
        <div className='row' >
          <div className='col-sm-8' >
            <ListNews />
          </div>
          <div className='col-sm-4' >
            <AddNews />
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
  getNews: PropTypes.func.isRequired,
  changeAvatar: PropTypes.func.isRequired,
  editStatus: PropTypes.func.isRequired,
  changeUserInfo: PropTypes.func.isRequired
}

export default User
