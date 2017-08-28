import { connect } from 'react-redux'
import { getNews } from '../../../store/news'
import { logout } from '../../User/modules/user'
import Home from '../components/HomeView'

const mapDispatchToProps = {
  getNews,
  logout
}

const mapStateToProps = (state) => {
  return {
    user: state.user ? state.user.user : {},
    load: state.user ? state.user.load : false,
    isLogin: state.user ? state.user.isLogin : false
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
