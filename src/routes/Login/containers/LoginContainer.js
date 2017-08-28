import { connect } from 'react-redux'
import { checkLogin } from '../../User/modules/user'
import Login from '../components/Login'

const mapDispatchToProps = {
  checkLogin
}

const mapStateToProps = (state) => {
  return {
    user: state.user && state.user.user ? state.user.user : {},
    load: state.user ? state.user.load : false,
    isLogin: state.user ? state.user.isLogin : false
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
