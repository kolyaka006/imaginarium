import { connect } from 'react-redux'
import { getNews, changeAvatar, editStatus, changeUserInfo } from '../modules/user'
import User from '../components/User'

const mapDispatchToProps = {
  getNews,
  changeAvatar,
  editStatus,
  changeUserInfo
}

const mapStateToProps = (state) => {
  return {
    idUser: state.user.id,
    login: state.user.login,
    name: state.user.name,
    avatar: state.user.avatar,
    edit: state.user.edit
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
