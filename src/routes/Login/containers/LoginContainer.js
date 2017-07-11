import { connect } from 'react-redux'
import { checkLogin } from '../../User/modules/user'
import Login from '../components/Login'

const mapDispatchToProps = {
  checkLogin
}

const mapStateToProps = (state) => ({
  login : state.user.login,
  password : state.user.password,
  load : state.user.load,
  isLogin: state.user.isLogin
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
